"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.chatbotRoutes = chatbotRoutes;
const chatbot_service_1 = require("../services/ai/chatbot.service");
const zod_schemas_1 = require("../utils/zod-schemas");
const zod_1 = require("zod");
const crypto_1 = __importDefault(require("crypto"));
const auth_middleware_1 = require("../middlewares/auth.middleware");
const chatbot_admin_service_1 = require("../services/chatbot-admin.service");
const prisma_1 = require("../lib/prisma");
async function chatbotRoutes(fastify) {
    // Chatbot-specific rate limit: max 10 requests per minute per IP
    fastify.addHook('onRequest', async (request, reply) => {
        // Additional rate limit is handled by global @fastify/rate-limit
        // This hook can add chatbot-specific logic
    });
    fastify.post('/ask', async (request, reply) => {
        try {
            const body = zod_schemas_1.ChatbotAskSchema.parse(request.body);
            // Hash IP for privacy-compliant logging
            const ip = request.ip || 'unknown';
            const ipHash = crypto_1.default.createHash('sha256').update(ip).digest('hex').slice(0, 16);
            const sessionId = body.sessionId || crypto_1.default.randomUUID();
            const result = await (0, chatbot_service_1.processChatbotQuestion)({
                question: body.question,
                sessionId,
                ipHash,
            });
            return reply.send(result);
        }
        catch (err) {
            if (err instanceof zod_1.ZodError) {
                return reply.status(400).send({ error: err.errors[0]?.message || 'Input tidak valid' });
            }
            fastify.log.error(err);
            return reply.status(500).send({ error: 'Terjadi kesalahan. Silakan coba lagi.' });
        }
    });
    // GET chat analytics (admin only — guarded in frontend via session)
    fastify.get('/analytics', async (_request, reply) => {
        const [totalChats, topQuestions] = await Promise.all([
            prisma_1.prisma.chatLog.count() ?? 0,
            prisma_1.prisma.chatLog.groupBy({
                by: ['question'],
                _count: { question: true },
                orderBy: { _count: { question: 'desc' } },
                take: 20,
            }) ?? [],
        ]);
        return reply.send({ total: totalChats, topQuestions });
    });
    // GET all questions (aggregated, admin only)
    fastify.get('/admin/questions', {
        preHandler: [auth_middleware_1.authMiddleware, (0, auth_middleware_1.requireRole)('ADMIN', 'SUPER_ADMIN')],
        handler: async (request, reply) => {
            try {
                const token = request.headers['authorization']?.slice(7) || '';
                const questions = await chatbot_admin_service_1.chatbotAdminService.getAggregatedQuestions(token);
                return reply.send({ data: questions });
            }
            catch (err) {
                fastify.log.error(err);
                return reply.status(500).send({ error: 'Gagal mengambil data pertanyaan.' });
            }
        },
    });
}
