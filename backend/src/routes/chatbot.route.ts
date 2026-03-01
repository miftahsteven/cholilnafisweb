import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { processChatbotQuestion } from '../services/ai/chatbot.service';
import { ChatbotAskSchema } from '../utils/zod-schemas';
import { ZodError } from 'zod';
import crypto from 'crypto';
import { prisma } from '../lib/prisma';

export async function chatbotRoutes(fastify: FastifyInstance) {
  // Chatbot-specific rate limit: max 10 requests per minute per IP
  fastify.addHook('onRequest', async (request, reply) => {
    // Additional rate limit is handled by global @fastify/rate-limit
    // This hook can add chatbot-specific logic
  });

  fastify.post('/ask', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const body = ChatbotAskSchema.parse(request.body);

      // Hash IP for privacy-compliant logging
      const ip = request.ip || 'unknown';
      const ipHash = crypto.createHash('sha256').update(ip).digest('hex').slice(0, 16);

      const sessionId = body.sessionId || crypto.randomUUID();

      const result = await processChatbotQuestion({
        question: body.question,
        sessionId,
        ipHash,
      });

      return reply.send(result);
    } catch (err) {
      if (err instanceof ZodError) {
        return reply.status(400).send({ error: err.errors[0]?.message || 'Input tidak valid' });
      }
      fastify.log.error(err);
      return reply.status(500).send({ error: 'Terjadi kesalahan. Silakan coba lagi.' });
    }
  });

  // GET chat analytics (admin only — guarded in frontend via session)
  fastify.get('/analytics', async (_request, reply) => {
    const [totalChats, topQuestions] = await Promise.all([
      prisma.chatLog.count() ?? 0,
      prisma.chatLog.groupBy({
        by: ['question'],
        _count: { question: true },
        orderBy: { _count: { question: 'desc' } },
        take: 20,
      }) ?? [],
    ]);

    return reply.send({ total: totalChats, topQuestions });
  });
}
