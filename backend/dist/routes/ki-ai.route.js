"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.kiAiRoutes = kiAiRoutes;
const auth_middleware_1 = require("../middlewares/auth.middleware");
const ki_ai_service_1 = require("../services/ki-ai.service");
const zod_schemas_1 = require("../utils/zod-schemas");
const zod_1 = require("zod");
const ki_ai_controller_1 = require("../modules/ki-ai/ki-ai.controller");
async function kiAiRoutes(fastify) {
    // Public Chat Endpoint
    fastify.post('/chat', async (request, reply) => {
        return ki_ai_controller_1.kiAiController.handleChat(request, reply);
    });
    // Public Feedback Endpoint
    fastify.post('/feedback', async (request, reply) => {
        return ki_ai_controller_1.kiAiController.provideFeedback(request, reply);
    });
    // Public Session History
    fastify.get('/sessions', async (request, reply) => {
        return ki_ai_controller_1.kiAiController.getSessions(request, reply);
    });
    // Public Session Details
    fastify.get('/sessions/:sessionId', async (request, reply) => {
        return ki_ai_controller_1.kiAiController.getSessionDetails(request, reply);
    });
    // Admin Knowledge Base CRUD Routes
    fastify.register(async (adminFastify) => {
        adminFastify.addHook('preHandler', auth_middleware_1.authMiddleware);
        adminFastify.addHook('preHandler', (0, auth_middleware_1.requireRole)('ADMIN', 'SUPER_ADMIN'));
        // --- Admin Chat Logs (Questions) Routes ---
        adminFastify.get('/questions', async (request, reply) => {
            return ki_ai_controller_1.kiAiController.getAllQuestions(request, reply);
        });
        adminFastify.delete('/questions/:id', async (request, reply) => {
            return ki_ai_controller_1.kiAiController.deleteQuestion(request, reply);
        });
        adminFastify.delete('/questions/reset/:userId', async (request, reply) => {
            return ki_ai_controller_1.kiAiController.resetUserQuestions(request, reply);
        });
        adminFastify.delete('/questions/wipe/:userId', async (request, reply) => {
            return ki_ai_controller_1.kiAiController.wipeUserQuestions(request, reply);
        });
        adminFastify.delete('/questions/unblock/:userId', async (request, reply) => {
            return ki_ai_controller_1.kiAiController.unblockUser(request, reply);
        });
        // GET all knowledge entries
        adminFastify.get('/', async (request, reply) => {
            const data = await ki_ai_service_1.kiAiKnowledgeService.getAll();
            return reply.send({ data });
        });
        // GET single knowledge entry
        adminFastify.get('/:id', async (request, reply) => {
            const entry = await ki_ai_service_1.kiAiKnowledgeService.getById(request.params.id);
            if (!entry)
                return reply.status(404).send({ error: 'Data not found' });
            return reply.send({ data: entry });
        });
        // POST create knowledge entry
        adminFastify.post('/', async (request, reply) => {
            try {
                const body = zod_schemas_1.CreateKiAiKnowledgeSchema.parse(request.body);
                const data = await ki_ai_service_1.kiAiKnowledgeService.create(body);
                return reply.status(201).send({ data });
            }
            catch (err) {
                if (err instanceof zod_1.ZodError)
                    return reply.status(400).send({ error: err.errors });
                if (err.message.includes('Duplicate'))
                    return reply.status(409).send({ error: err.message });
                throw err;
            }
        });
        // PUT update knowledge entry
        adminFastify.put('/:id', async (request, reply) => {
            try {
                const body = zod_schemas_1.UpdateKiAiKnowledgeSchema.parse(request.body);
                const data = await ki_ai_service_1.kiAiKnowledgeService.update(request.params.id, body);
                return reply.send({ data });
            }
            catch (err) {
                if (err instanceof zod_1.ZodError)
                    return reply.status(400).send({ error: err.errors });
                if (err.message.includes('Duplicate'))
                    return reply.status(409).send({ error: err.message });
                throw err;
            }
        });
        // DELETE knowledge entry
        adminFastify.delete('/:id', async (request, reply) => {
            try {
                await ki_ai_service_1.kiAiKnowledgeService.delete(request.params.id);
                return reply.send({ message: 'Data deleted successfully' });
            }
            catch (err) {
                return reply.status(500).send({ error: 'Failed to delete data' });
            }
        });
    });
}
