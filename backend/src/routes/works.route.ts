import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { authMiddleware, requireRole } from '../middlewares/auth.middleware';
import { prisma } from '../lib/prisma';
import { CreateWorkSchema } from '../utils/zod-schemas';
import { sanitizeRichText } from '../middlewares/sanitize';
import { ZodError } from 'zod';

export async function worksRoutes(fastify: FastifyInstance) {
  // GET all published works (public)
  fastify.get('/', async (request: FastifyRequest<{ Querystring: { type?: string } }>, reply) => {
    const { type } = request.query;
    const works = await prisma.work.findMany({
      where: {
        published: true,
        ...(type ? { type: type as any } : {}),
      },
      orderBy: [{ year: 'desc' }, { createdAt: 'desc' }],
    });
    return reply.send({ data: works });
  });

  // GET single work
  fastify.get('/:id', async (request: FastifyRequest<{ Params: { id: string } }>, reply) => {
    const work = await prisma.work.findUnique({ where: { id: request.params.id } });
    if (!work) return reply.status(404).send({ error: 'Work not found' });
    return reply.send({ data: work });
  });

  // POST create
  fastify.post('/', {
    preHandler: [authMiddleware, requireRole('ADMIN', 'EDITOR', 'SUPER_ADMIN')],
    handler: async (request, reply) => {
      try {
        const body = CreateWorkSchema.parse(request.body);
        const { content, ...rest } = body;
        const work = await prisma.work.create({
          data: {
            ...rest,
            ...(content && { content: sanitizeRichText(content) }),
          },
        });
        return reply.status(201).send({ data: work });
      } catch (err) {
        if (err instanceof ZodError) return reply.status(400).send({ error: err.errors });
        throw err;
      }
    },
  });

  // PATCH update
  fastify.patch('/:id', {
    preHandler: [authMiddleware, requireRole('ADMIN', 'EDITOR', 'SUPER_ADMIN')],
    handler: async (request: FastifyRequest<{ Params: { id: string } }>, reply) => {
      const body = request.body as any;
      const work = await prisma.work.update({
        where: { id: request.params.id },
        data: {
          ...body,
          ...(body.content && { content: sanitizeRichText(body.content) }),
        },
      });
      return reply.send({ data: work });
    },
  });

  // DELETE
  fastify.delete('/:id', {
    preHandler: [authMiddleware, requireRole('ADMIN', 'SUPER_ADMIN')],
    handler: async (request: FastifyRequest<{ Params: { id: string } }>, reply) => {
      await prisma.work.delete({ where: { id: request.params.id } });
      return reply.send({ message: 'Work deleted' });
    },
  });
}
