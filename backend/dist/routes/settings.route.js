"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.settingsRoutes = settingsRoutes;
const auth_middleware_1 = require("../middlewares/auth.middleware");
const prisma_1 = require("../lib/prisma");
const zod_schemas_1 = require("../utils/zod-schemas");
const zod_1 = require("zod");
async function settingsRoutes(fastify) {
    // GET all settings (public - for footer, site info)
    fastify.get('/', async (_request, reply) => {
        const settings = await prisma_1.prisma.setting.findMany();
        const settingsMap = Object.fromEntries(settings.map((s) => [s.key, s.value]));
        return reply.send({ data: settingsMap });
    });
    // GET single setting by key
    fastify.get('/:key', async (request, reply) => {
        const setting = await prisma_1.prisma.setting.findUnique({ where: { key: request.params.key } });
        if (!setting)
            return reply.status(404).send({ error: 'Setting not found' });
        return reply.send({ data: setting.value });
    });
    // PUT upsert setting (admin only)
    fastify.put('/:key', {
        preHandler: [auth_middleware_1.authMiddleware],
        handler: async (request, reply) => {
            try {
                const { value } = zod_schemas_1.UpdateSettingSchema.parse(request.body);
                const setting = await prisma_1.prisma.setting.upsert({
                    where: { key: request.params.key },
                    update: { value },
                    create: { key: request.params.key, value },
                });
                return reply.send({ data: setting });
            }
            catch (err) {
                if (err instanceof zod_1.ZodError)
                    return reply.status(400).send({ error: err.errors });
                throw err;
            }
        },
    });
}
