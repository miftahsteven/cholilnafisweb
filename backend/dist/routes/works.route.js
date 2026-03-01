"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.worksRoutes = worksRoutes;
const auth_middleware_1 = require("../middlewares/auth.middleware");
const prisma_1 = require("../lib/prisma");
const zod_schemas_1 = require("../utils/zod-schemas");
const sanitize_1 = require("../middlewares/sanitize");
const zod_1 = require("zod");
async function worksRoutes(fastify) {
    // GET all published works (public)
    fastify.get('/', async (request, reply) => {
        const { type } = request.query;
        const works = await prisma_1.prisma.work.findMany({
            where: {
                published: true,
                ...(type ? { type: type } : {}),
            },
            orderBy: [{ year: 'desc' }, { createdAt: 'desc' }],
        });
        return reply.send({ data: works });
    });
    // GET single work
    fastify.get('/:id', async (request, reply) => {
        const work = await prisma_1.prisma.work.findUnique({ where: { id: request.params.id } });
        if (!work)
            return reply.status(404).send({ error: 'Work not found' });
        return reply.send({ data: work });
    });
    // POST create
    fastify.post('/', {
        preHandler: [auth_middleware_1.authMiddleware, (0, auth_middleware_1.requireRole)('ADMIN', 'EDITOR', 'SUPER_ADMIN')],
        handler: async (request, reply) => {
            try {
                const body = zod_schemas_1.CreateWorkSchema.parse(request.body);
                const { content, ...rest } = body;
                const work = await prisma_1.prisma.work.create({
                    data: {
                        ...rest,
                        ...(content && { content: (0, sanitize_1.sanitizeRichText)(content) }),
                    },
                });
                return reply.status(201).send({ data: work });
            }
            catch (err) {
                if (err instanceof zod_1.ZodError)
                    return reply.status(400).send({ error: err.errors });
                throw err;
            }
        },
    });
    // PATCH update
    fastify.patch('/:id', {
        preHandler: [auth_middleware_1.authMiddleware, (0, auth_middleware_1.requireRole)('ADMIN', 'EDITOR', 'SUPER_ADMIN')],
        handler: async (request, reply) => {
            const body = request.body;
            const work = await prisma_1.prisma.work.update({
                where: { id: request.params.id },
                data: {
                    ...body,
                    ...(body.content && { content: (0, sanitize_1.sanitizeRichText)(body.content) }),
                },
            });
            return reply.send({ data: work });
        },
    });
    // DELETE
    fastify.delete('/:id', {
        preHandler: [auth_middleware_1.authMiddleware, (0, auth_middleware_1.requireRole)('ADMIN', 'SUPER_ADMIN')],
        handler: async (request, reply) => {
            await prisma_1.prisma.work.delete({ where: { id: request.params.id } });
            return reply.send({ message: 'Work deleted' });
        },
    });
}
