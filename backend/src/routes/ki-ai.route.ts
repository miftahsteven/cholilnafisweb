import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { authMiddleware, requireRole } from '../middlewares/auth.middleware';
import { kiAiKnowledgeService } from '../services/ki-ai.service';
import { CreateKiAiKnowledgeSchema, UpdateKiAiKnowledgeSchema } from '../utils/zod-schemas';
import { ZodError } from 'zod';
import { kiAiController } from '../modules/ki-ai/ki-ai.controller';

export async function kiAiRoutes(fastify: FastifyInstance) {
  // Public Chat Endpoint
  fastify.post('/chat', async (request: FastifyRequest, reply: FastifyReply) => {
    return kiAiController.handleChat(request, reply);
  });

  // Public Feedback Endpoint
  fastify.post('/feedback', async (request: FastifyRequest, reply: FastifyReply) => {
    return kiAiController.provideFeedback(request, reply);
  });

  // Public Session History
  fastify.get('/sessions', async (request: FastifyRequest, reply: FastifyReply) => {
    return kiAiController.getSessions(request, reply);
  });

  // Public Session Details
  fastify.get('/sessions/:sessionId', async (request: FastifyRequest<{ Params: { sessionId: string } }>, reply: FastifyReply) => {
    return kiAiController.getSessionDetails(request, reply);
  });

  // Admin Knowledge Base CRUD Routes
  fastify.register(async (adminFastify) => {
    adminFastify.addHook('preHandler', authMiddleware);
    adminFastify.addHook('preHandler', requireRole('ADMIN', 'SUPER_ADMIN'));

    // --- Admin Chat Logs (Questions) Routes ---
    adminFastify.get('/questions', async (request: FastifyRequest, reply: FastifyReply) => {
      return kiAiController.getAllQuestions(request, reply);
    });

    adminFastify.delete('/questions/:id', async (request: FastifyRequest, reply: FastifyReply) => {
      return kiAiController.deleteQuestion(request, reply);
    });

    adminFastify.delete('/questions/reset/:userId', async (request: FastifyRequest, reply: FastifyReply) => {
      return kiAiController.resetUserQuestions(request, reply);
    });

    adminFastify.delete('/questions/wipe/:userId', async (request: FastifyRequest, reply: FastifyReply) => {
      return kiAiController.wipeUserQuestions(request, reply);
    });

    adminFastify.delete('/questions/unblock/:userId', async (request: FastifyRequest, reply: FastifyReply) => {
      return kiAiController.unblockUser(request, reply);
    });


    // GET all knowledge entries
    adminFastify.get('/', async (request: FastifyRequest, reply: FastifyReply) => {
      const data = await kiAiKnowledgeService.getAll();
      return reply.send({ data });
    });

    // GET single knowledge entry
    adminFastify.get('/:id', async (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
      const entry = await kiAiKnowledgeService.getById(request.params.id);
      if (!entry) return reply.status(404).send({ error: 'Data not found' });
      return reply.send({ data: entry });
    });

    // POST create knowledge entry
    adminFastify.post('/', async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const body = CreateKiAiKnowledgeSchema.parse(request.body);
        const data = await kiAiKnowledgeService.create(body);
        return reply.status(201).send({ data });
      } catch (err: any) {
        if (err instanceof ZodError) return reply.status(400).send({ error: err.errors });
        if (err.message.includes('Duplicate')) return reply.status(409).send({ error: err.message });
        throw err;
      }
    });

    // PUT update knowledge entry
    adminFastify.put('/:id', async (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
      try {
        const body = UpdateKiAiKnowledgeSchema.parse(request.body);
        const data = await kiAiKnowledgeService.update(request.params.id, body);
        return reply.send({ data });
      } catch (err: any) {
        if (err instanceof ZodError) return reply.status(400).send({ error: err.errors });
        if (err.message.includes('Duplicate')) return reply.status(409).send({ error: err.message });
        throw err;
      }
    });

    // DELETE knowledge entry
    adminFastify.delete('/:id', async (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
      try {
        await kiAiKnowledgeService.delete(request.params.id);
        return reply.send({ message: 'Data deleted successfully' });
      } catch (err: any) {
        return reply.status(500).send({ error: 'Failed to delete data' });
      }
    });
  });
}
