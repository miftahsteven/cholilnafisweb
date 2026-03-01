"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postsRoutes = postsRoutes;
const auth_middleware_1 = require("../middlewares/auth.middleware");
const prisma_1 = require("../lib/prisma");
const zod_schemas_1 = require("../utils/zod-schemas");
const sanitize_1 = require("../middlewares/sanitize");
const zod_1 = require("zod");
async function postsRoutes(fastify) {
    // GET all published posts (public)
    fastify.get('/', async (request, reply) => {
        const posts = await prisma_1.prisma.post.findMany({
            where: { status: 'PUBLISHED' },
            select: {
                id: true, title: true, slug: true, excerpt: true,
                coverImage: true, publishedAt: true,
                author: { select: { name: true } },
                categories: { select: { category: { select: { name: true, slug: true } } } },
            },
            orderBy: { publishedAt: 'desc' },
        });
        return reply.send({ data: posts });
    });
    // GET all posts for admin (all statuses)
    fastify.get('/admin/all', {
        preHandler: [auth_middleware_1.authMiddleware, (0, auth_middleware_1.requireRole)('ADMIN', 'EDITOR', 'SUPER_ADMIN')],
        handler: async (request, reply) => {
            const posts = await prisma_1.prisma.post.findMany({
                select: {
                    id: true, title: true, slug: true, excerpt: true,
                    status: true, coverImage: true, publishedAt: true, createdAt: true,
                    author: { select: { name: true } },
                    categories: { select: { category: { select: { name: true } } } },
                },
                orderBy: { createdAt: 'desc' },
            });
            return reply.send({ data: posts });
        },
    });
    // GET single post by slug (public)
    fastify.get('/:slug', async (request, reply) => {
        const post = await prisma_1.prisma.post.findUnique({
            where: { slug: request.params.slug },
            include: {
                author: { select: { name: true, image: true } },
                categories: { select: { category: true } },
                tags: { select: { tag: true } },
            },
        });
        if (!post)
            return reply.status(404).send({ error: 'Post not found' });
        return reply.send({ data: post });
    });
    // POST create (admin/editor only)
    fastify.post('/', {
        preHandler: [auth_middleware_1.authMiddleware, (0, auth_middleware_1.requireRole)('ADMIN', 'EDITOR', 'SUPER_ADMIN')],
        handler: async (request, reply) => {
            try {
                const body = zod_schemas_1.CreatePostSchema.parse(request.body);
                const { categoryIds, tagIds, content, ...rest } = body;
                const post = await prisma_1.prisma.post.create({
                    data: {
                        ...rest,
                        content: (0, sanitize_1.sanitizeRichText)(content),
                        authorId: request.user.sub,
                        publishedAt: rest.status === 'PUBLISHED' ? new Date() : null,
                        categories: categoryIds ? {
                            create: categoryIds.map((id) => ({ categoryId: id })),
                        } : undefined,
                        tags: tagIds ? {
                            create: tagIds.map((id) => ({ tagId: id })),
                        } : undefined,
                    },
                });
                return reply.status(201).send({ data: post });
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
            try {
                const body = zod_schemas_1.UpdatePostSchema.parse(request.body);
                const { content, ...rest } = body;
                const post = await prisma_1.prisma.post.update({
                    where: { id: request.params.id },
                    data: {
                        ...rest,
                        ...(content && { content: (0, sanitize_1.sanitizeRichText)(content) }),
                        ...(rest.status === 'PUBLISHED' && { publishedAt: new Date() }),
                    },
                });
                return reply.send({ data: post });
            }
            catch (err) {
                if (err instanceof zod_1.ZodError)
                    return reply.status(400).send({ error: err.errors });
                throw err;
            }
        },
    });
    // DELETE post
    fastify.delete('/:id', {
        preHandler: [auth_middleware_1.authMiddleware, (0, auth_middleware_1.requireRole)('ADMIN', 'SUPER_ADMIN')],
        handler: async (request, reply) => {
            await prisma_1.prisma.post.delete({ where: { id: request.params.id } });
            return reply.send({ message: 'Post deleted' });
        },
    });
}
