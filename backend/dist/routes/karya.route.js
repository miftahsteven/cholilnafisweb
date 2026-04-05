"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.karyaRoutes = karyaRoutes;
const auth_middleware_1 = require("../middlewares/auth.middleware");
const prisma_1 = require("../lib/prisma");
const zod_schemas_1 = require("../utils/zod-schemas");
const sanitize_1 = require("../middlewares/sanitize");
const zod_1 = require("zod");
async function karyaRoutes(fastify) {
    // GET all published karya (public)
    fastify.get('/', async (request, reply) => {
        const karya = await prisma_1.prisma.karya.findMany({
            where: { status: 'PUBLISHED' },
            orderBy: { createdAt: 'desc' },
        });
        return reply.send({ data: karya });
    });
    // GET all karya for admin (all statuses)
    fastify.get('/admin/all', {
        preHandler: [auth_middleware_1.authMiddleware, (0, auth_middleware_1.requireRole)('ADMIN', 'EDITOR', 'SUPER_ADMIN')],
        handler: async (request, reply) => {
            const karya = await prisma_1.prisma.karya.findMany({
                orderBy: { createdAt: 'desc' },
            });
            return reply.send({ data: karya });
        },
    });
    // GET single karya by id (public)
    fastify.get('/:id', async (request, reply) => {
        const karya = await prisma_1.prisma.karya.findUnique({
            where: { id: request.params.id },
        });
        if (!karya)
            return reply.status(404).send({ error: 'Karya not found' });
        return reply.send({ data: karya });
    });
    // POST create (admin/editor only)
    fastify.post('/', {
        preHandler: [auth_middleware_1.authMiddleware, (0, auth_middleware_1.requireRole)('ADMIN', 'EDITOR', 'SUPER_ADMIN')],
        handler: async (request, reply) => {
            try {
                const body = zod_schemas_1.CreateKaryaSchema.parse(request.body);
                const { fullcontent, ...rest } = body;
                const karya = await prisma_1.prisma.karya.create({
                    data: {
                        ...rest,
                        fullcontent: fullcontent ? (0, sanitize_1.sanitizeRichText)(fullcontent) : fullcontent,
                    },
                });
                return reply.status(201).send({ data: karya });
            }
            catch (err) {
                if (err instanceof zod_1.ZodError)
                    return reply.status(400).send({ error: err.errors });
                throw err;
            }
        },
    });
    // PATCH update (admin/editor only)
    fastify.patch('/:id', {
        preHandler: [auth_middleware_1.authMiddleware, (0, auth_middleware_1.requireRole)('ADMIN', 'EDITOR', 'SUPER_ADMIN')],
        handler: async (request, reply) => {
            try {
                const body = zod_schemas_1.UpdateKaryaSchema.parse(request.body);
                const { fullcontent, ...rest } = body;
                const karya = await prisma_1.prisma.karya.update({
                    where: { id: request.params.id },
                    data: {
                        ...rest,
                        ...(fullcontent && { fullcontent: (0, sanitize_1.sanitizeRichText)(fullcontent) }),
                        ...(rest.status === 'PUBLISHED' && { updatedAt: new Date() }), // Optional for explicit save timestamp
                    },
                });
                return reply.send({ data: karya });
            }
            catch (err) {
                if (err instanceof zod_1.ZodError)
                    return reply.status(400).send({ error: err.errors });
                if (err.code === 'P2025')
                    return reply.status(404).send({ error: 'Data tidak ditemukan (tidak bisa mengubah data demo)' });
                throw err;
            }
        },
    });
    // DELETE karya (admin/super admin only)
    fastify.delete('/:id', {
        preHandler: [auth_middleware_1.authMiddleware, (0, auth_middleware_1.requireRole)('ADMIN', 'SUPER_ADMIN')],
        handler: async (request, reply) => {
            try {
                await prisma_1.prisma.karya.delete({ where: { id: request.params.id } });
                return reply.send({ message: 'Karya deleted' });
            }
            catch (err) {
                if (err.code === 'P2025')
                    return reply.status(404).send({ error: 'Data tidak ditemukan (tidak bisa menghapus data demo)' });
                throw err;
            }
        },
    });
}
