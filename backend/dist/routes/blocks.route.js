"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blocksRoutes = blocksRoutes;
const auth_middleware_1 = require("../middlewares/auth.middleware");
const prisma_1 = require("../lib/prisma");
const zod_schemas_1 = require("../utils/zod-schemas");
const zod_1 = require("zod");
async function blocksRoutes(fastify) {
    // GET blocks for a page by slug (public)
    fastify.get('/page/:slug', async (request, reply) => {
        const page = await prisma_1.prisma.page.findUnique({
            where: { slug: request.params.slug },
            include: {
                blocks: {
                    where: { active: true },
                    orderBy: { order: 'asc' },
                },
            },
        });
        if (!page)
            return reply.status(404).send({ error: 'Page not found' });
        return reply.send({ data: page });
    });
    // POST create block (admin only)
    fastify.post('/', {
        preHandler: [auth_middleware_1.authMiddleware, (0, auth_middleware_1.requireRole)('ADMIN', 'SUPER_ADMIN')],
        handler: async (request, reply) => {
            try {
                const body = zod_schemas_1.CreateBlockSchema.parse(request.body);
                const block = await prisma_1.prisma.block.create({ data: body });
                return reply.status(201).send({ data: block });
            }
            catch (err) {
                if (err instanceof zod_1.ZodError)
                    return reply.status(400).send({ error: err.errors });
                throw err;
            }
        },
    });
    // PATCH update block content/order/active
    fastify.patch('/:id', {
        preHandler: [auth_middleware_1.authMiddleware, (0, auth_middleware_1.requireRole)('ADMIN', 'SUPER_ADMIN')],
        handler: async (request, reply) => {
            const body = request.body;
            const block = await prisma_1.prisma.block.update({
                where: { id: request.params.id },
                data: body,
            });
            return reply.send({ data: block });
        },
    });
    // DELETE block
    fastify.delete('/:id', {
        preHandler: [auth_middleware_1.authMiddleware, (0, auth_middleware_1.requireRole)('ADMIN', 'SUPER_ADMIN')],
        handler: async (request, reply) => {
            await prisma_1.prisma.block.delete({ where: { id: request.params.id } });
            return reply.send({ message: 'Block deleted' });
        },
    });
}
