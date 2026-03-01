import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { authMiddleware, requireRole } from '../middlewares/auth.middleware';
import { prisma } from '../lib/prisma';
import { CreatePostSchema, UpdatePostSchema } from '../utils/zod-schemas';
import { sanitizeRichText, sanitizePlainText } from '../middlewares/sanitize';
import { ZodError } from 'zod';

export async function postsRoutes(fastify: FastifyInstance) {
  // GET all published posts (public)
  fastify.get('/', async (request: FastifyRequest, reply: FastifyReply) => {
    const posts = await prisma.post.findMany({
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
    preHandler: [authMiddleware, requireRole('ADMIN', 'EDITOR', 'SUPER_ADMIN')],
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      const posts = await prisma.post.findMany({
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
  fastify.get('/:slug', async (request: FastifyRequest<{ Params: { slug: string } }>, reply: FastifyReply) => {
    const post = await prisma.post.findUnique({
      where: { slug: request.params.slug },
      include: {
        author: { select: { name: true, image: true } },
        categories: { select: { category: true } },
        tags: { select: { tag: true } },
      },
    });
    if (!post) return reply.status(404).send({ error: 'Post not found' });
    return reply.send({ data: post });
  });

  // POST create (admin/editor only)
  fastify.post('/', {
    preHandler: [authMiddleware, requireRole('ADMIN', 'EDITOR', 'SUPER_ADMIN')],
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const body = CreatePostSchema.parse(request.body);
        const { categoryIds, tagIds, content, ...rest } = body;

        const post = await prisma.post.create({
          data: {
            ...rest,
            content: sanitizeRichText(content),
            authorId: (request as any).user.sub,
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
      } catch (err) {
        if (err instanceof ZodError) return reply.status(400).send({ error: err.errors });
        throw err;
      }
    },
  });

  // PATCH update
  fastify.patch('/:id', {
    preHandler: [authMiddleware, requireRole('ADMIN', 'EDITOR', 'SUPER_ADMIN')],
    handler: async (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
      try {
        const body = UpdatePostSchema.parse(request.body);
        const { content, ...rest } = body;

        const post = await prisma.post.update({
          where: { id: request.params.id },
          data: {
            ...rest,
            ...(content && { content: sanitizeRichText(content) }),
            ...(rest.status === 'PUBLISHED' && { publishedAt: new Date() }),
          },
        });
        return reply.send({ data: post });
      } catch (err) {
        if (err instanceof ZodError) return reply.status(400).send({ error: err.errors });
        throw err;
      }
    },
  });

  // DELETE post
  fastify.delete('/:id', {
    preHandler: [authMiddleware, requireRole('ADMIN', 'SUPER_ADMIN')],
    handler: async (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
      await prisma.post.delete({ where: { id: request.params.id } });
      return reply.send({ message: 'Post deleted' });
    },
  });
}
