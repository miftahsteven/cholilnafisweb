import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { authMiddleware, requireRole } from '../middlewares/auth.middleware';
import { prisma } from '../lib/prisma';
import { CreateKaryaSchema, UpdateKaryaSchema } from '../utils/zod-schemas';
import { sanitizeRichText } from '../middlewares/sanitize';
import { ZodError } from 'zod';

export async function karyaRoutes(fastify: FastifyInstance) {
  // GET all published karya (public)
  fastify.get('/', async (request: FastifyRequest, reply: FastifyReply) => {
    const karya = await prisma.karya.findMany({
      where: { status: 'PUBLISHED' },
      orderBy: { createdAt: 'desc' },
    });
    return reply.send({ data: karya });
  });

  // GET all karya for admin (all statuses)
  fastify.get('/admin/all', {
    preHandler: [authMiddleware, requireRole('ADMIN', 'EDITOR', 'SUPER_ADMIN')],
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      const karya = await prisma.karya.findMany({
        orderBy: { createdAt: 'desc' },
      });
      return reply.send({ data: karya });
    },
  });

  // GET single karya by id (public)
  fastify.get('/:id', async (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
    const karya = await prisma.karya.findUnique({
      where: { id: request.params.id },
    });
    if (!karya) return reply.status(404).send({ error: 'Karya not found' });
    return reply.send({ data: karya });
  });

  // POST create (admin/editor only)
  fastify.post('/', {
    preHandler: [authMiddleware, requireRole('ADMIN', 'EDITOR', 'SUPER_ADMIN')],
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const body = CreateKaryaSchema.parse(request.body);
        const { fullcontent, ...rest } = body;

        const karya = await prisma.karya.create({
          data: {
            ...rest,
            fullcontent: fullcontent ? sanitizeRichText(fullcontent) : fullcontent,
          },
        });
        return reply.status(201).send({ data: karya });
      } catch (err) {
        if (err instanceof ZodError) return reply.status(400).send({ error: err.errors });
        throw err;
      }
    },
  });

  // PATCH update (admin/editor only)
  fastify.patch('/:id', {
    preHandler: [authMiddleware, requireRole('ADMIN', 'EDITOR', 'SUPER_ADMIN')],
    handler: async (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
      try {
        const body = UpdateKaryaSchema.parse(request.body);
        const { fullcontent, ...rest } = body;

        const karya = await prisma.karya.update({
          where: { id: request.params.id },
          data: {
            ...rest,
            ...(fullcontent && { fullcontent: sanitizeRichText(fullcontent) }),
            ...(rest.status === 'PUBLISHED' && { updatedAt: new Date() }), // Optional for explicit save timestamp
          },
        });
        return reply.send({ data: karya });
      } catch (err: any) {
        if (err instanceof ZodError) return reply.status(400).send({ error: err.errors });
        if (err.code === 'P2025') return reply.status(404).send({ error: 'Data tidak ditemukan (tidak bisa mengubah data demo)' });
        throw err;
      }
    },
  });

  // DELETE karya (admin/super admin only)
  fastify.delete('/:id', {
    preHandler: [authMiddleware, requireRole('ADMIN', 'SUPER_ADMIN')],
    handler: async (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
      try {
        await prisma.karya.delete({ where: { id: request.params.id } });
        return reply.send({ message: 'Karya deleted' });
      } catch (err: any) {
        if (err.code === 'P2025') return reply.status(404).send({ error: 'Data tidak ditemukan (tidak bisa menghapus data demo)' });
        throw err;
      }
    },
  });
}