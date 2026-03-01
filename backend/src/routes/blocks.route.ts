import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { authMiddleware, requireRole } from '../middlewares/auth.middleware';
import { prisma } from '../lib/prisma';
import { CreateBlockSchema } from '../utils/zod-schemas';
import { ZodError } from 'zod';

export async function blocksRoutes(fastify: FastifyInstance) {
  // GET blocks for a page by slug (public)
  fastify.get('/page/:slug', async (request: FastifyRequest<{ Params: { slug: string } }>, reply) => {
    const page = await prisma.page.findUnique({
      where: { slug: request.params.slug },
      include: {
        blocks: {
          where: { active: true },
          orderBy: { order: 'asc' },
        },
      },
    });
    if (!page) return reply.status(404).send({ error: 'Page not found' });
    return reply.send({ data: page });
  });

  // POST create block (admin only)
  fastify.post('/', {
    preHandler: [authMiddleware, requireRole('ADMIN', 'SUPER_ADMIN')],
    handler: async (request, reply) => {
      try {
        const body = CreateBlockSchema.parse(request.body);
        const block = await prisma.block.create({ data: body });
        return reply.status(201).send({ data: block });
      } catch (err) {
        if (err instanceof ZodError) return reply.status(400).send({ error: err.errors });
        throw err;
      }
    },
  });

  // PATCH update block content/order/active
  fastify.patch('/:id', {
    preHandler: [authMiddleware, requireRole('ADMIN', 'SUPER_ADMIN')],
    handler: async (request: FastifyRequest<{ Params: { id: string } }>, reply) => {
      const body = request.body as Partial<{ content: any; order: number; active: boolean }>;
      const block = await prisma.block.update({
        where: { id: request.params.id },
        data: body,
      });
      return reply.send({ data: block });
    },
  });

  // DELETE block
  fastify.delete('/:id', {
    preHandler: [authMiddleware, requireRole('ADMIN', 'SUPER_ADMIN')],
    handler: async (request: FastifyRequest<{ Params: { id: string } }>, reply) => {
      await prisma.block.delete({ where: { id: request.params.id } });
      return reply.send({ message: 'Block deleted' });
    },
  });
}
