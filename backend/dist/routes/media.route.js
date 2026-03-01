"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mediaRoutes = mediaRoutes;
const auth_middleware_1 = require("../middlewares/auth.middleware");
const prisma_1 = require("../lib/prisma");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const promises_1 = require("stream/promises");
const crypto_1 = __importDefault(require("crypto"));
async function mediaRoutes(fastify) {
    // GET all media (paginated)
    fastify.get('/', {
        preHandler: [auth_middleware_1.authMiddleware],
        handler: async (request, reply) => {
            const page = Number(request.query.page || 1);
            const limit = 20;
            const [items, total] = await Promise.all([
                prisma_1.prisma.media.findMany({
                    where: request.query.type ? { type: request.query.type } : {},
                    orderBy: { createdAt: 'desc' },
                    skip: (page - 1) * limit,
                    take: limit,
                }),
                prisma_1.prisma.media.count({
                    where: request.query.type ? { type: request.query.type } : {},
                }),
            ]);
            return reply.send({ data: items, total, page, totalPages: Math.ceil(total / limit) });
        },
    });
    // POST upload media via multipart
    fastify.post('/upload', {
        preHandler: [auth_middleware_1.authMiddleware, (0, auth_middleware_1.requireRole)('ADMIN', 'EDITOR', 'SUPER_ADMIN')],
        handler: async (request, reply) => {
            const data = await request.file();
            if (!data)
                return reply.status(400).send({ error: 'No file uploaded' });
            const allowedImageMimes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml'];
            if (!allowedImageMimes.includes(data.mimetype)) {
                return reply.status(400).send({ error: 'Unsupported file type' });
            }
            const ext = path_1.default.extname(data.filename) || '.jpg';
            const filename = `${crypto_1.default.randomUUID()}${ext}`;
            const uploadsDir = path_1.default.join(__dirname, '../../public/uploads');
            const filepath = path_1.default.join(uploadsDir, filename);
            await (0, promises_1.pipeline)(data.file, fs_1.default.createWriteStream(filepath));
            const fileUrl = `${process.env.BACKEND_URL || 'http://localhost:4000'}/uploads/${filename}`;
            const sizeBytes = fs_1.default.statSync(filepath).size;
            const media = await prisma_1.prisma.media.create({
                data: {
                    filename: data.filename,
                    url: fileUrl,
                    type: 'image',
                    size: sizeBytes,
                    mimeType: data.mimetype,
                }
            });
            return reply.status(201).send({ data: media });
        },
    });
    // POST upload from URL
    fastify.post('/upload-url', {
        preHandler: [auth_middleware_1.authMiddleware, (0, auth_middleware_1.requireRole)('ADMIN', 'EDITOR', 'SUPER_ADMIN')],
        handler: async (request, reply) => {
            const { url } = request.body;
            if (!url)
                return reply.status(400).send({ error: 'URL is required' });
            try {
                const response = await fetch(url);
                if (!response.ok)
                    throw new Error(`Failed to fetch image: ${response.statusText}`);
                const contentType = response.headers.get('content-type') || 'image/jpeg';
                const ext = contentType.split('/')[1] || 'jpg';
                const filename = `${crypto_1.default.randomUUID()}.${ext}`;
                const uploadsDir = path_1.default.join(__dirname, '../../public/uploads');
                const filepath = path_1.default.join(uploadsDir, filename);
                const arrayBuffer = await response.arrayBuffer();
                const buffer = Buffer.from(arrayBuffer);
                fs_1.default.writeFileSync(filepath, buffer);
                const fileUrl = `${process.env.BACKEND_URL || 'http://localhost:4000'}/uploads/${filename}`;
                const media = await prisma_1.prisma.media.create({
                    data: {
                        filename: `url-download.${ext}`,
                        url: fileUrl,
                        type: 'image',
                        size: buffer.byteLength,
                        mimeType: contentType,
                    }
                });
                return reply.status(201).send({ data: media });
            }
            catch (err) {
                return reply.status(400).send({ error: err.message || 'Failed to download image from URL' });
            }
        }
    });
    // POST register media (for external videos or manually registering already uploaded media)
    fastify.post('/register', {
        preHandler: [auth_middleware_1.authMiddleware],
        handler: async (request, reply) => {
            const body = request.body;
            const media = await prisma_1.prisma.media.create({ data: body });
            return reply.status(201).send({ data: media });
        },
    });
    // DELETE media
    fastify.delete('/:id', {
        preHandler: [auth_middleware_1.authMiddleware],
        handler: async (request, reply) => {
            const media = await prisma_1.prisma.media.findUnique({ where: { id: request.params.id } });
            if (!media)
                return reply.status(404).send({ error: 'Media not found' });
            // Physical delete if it is local
            if (media.url.includes('/uploads/')) {
                const filename = media.url.split('/').pop();
                if (filename) {
                    const filepath = path_1.default.join(__dirname, '../../public/uploads', filename);
                    if (fs_1.default.existsSync(filepath)) {
                        fs_1.default.unlinkSync(filepath);
                    }
                }
            }
            await prisma_1.prisma.media.delete({ where: { id: request.params.id } });
            return reply.send({ message: 'Media deleted' });
        },
    });
}
