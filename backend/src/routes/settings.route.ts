import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { authMiddleware } from '../middlewares/auth.middleware';
import { prisma } from '../lib/prisma';
import { UpdateSettingSchema } from '../utils/zod-schemas';
import { ZodError } from 'zod';

export async function settingsRoutes(fastify: FastifyInstance) {
  // GET all settings (public - for footer, site info)
  fastify.get('/', async (_request, reply) => {
    const settings = await prisma.setting.findMany();
    const settingsMap = Object.fromEntries(settings.map((s) => [s.key, s.value]));
    return reply.send({ data: settingsMap });
  });

  // GET single setting by key
  fastify.get('/:key', async (request: FastifyRequest<{ Params: { key: string } }>, reply) => {
    const setting = await prisma.setting.findUnique({ where: { key: request.params.key } });
    if (!setting) return reply.status(404).send({ error: 'Setting not found' });
    return reply.send({ data: setting.value });
  });

  // PUT upsert setting (admin only)
  fastify.put('/:key', {
    preHandler: [authMiddleware],
    handler: async (request: FastifyRequest<{ Params: { key: string } }>, reply) => {
      try {
        const { value } = UpdateSettingSchema.parse(request.body);
        const setting = await prisma.setting.upsert({
          where: { key: request.params.key },
          update: { value },
          create: { key: request.params.key, value },
        });
        return reply.send({ data: setting });
      } catch (err) {
        if (err instanceof ZodError) return reply.status(400).send({ error: err.errors });
        throw err;
      }
    },
  });
}
