"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.kiAiKnowledgeService = exports.KiAiKnowledgeService = void 0;
const prisma_1 = require("../lib/prisma");
class KiAiKnowledgeService {
    async getAll() {
        return prisma_1.prisma.kiAiKnowledge.findMany({
            orderBy: { createdAt: 'desc' },
        });
    }
    async getById(id) {
        return prisma_1.prisma.kiAiKnowledge.findUnique({
            where: { id },
        });
    }
    async create(data) {
        // Check for exact duplicate of content
        const existing = await prisma_1.prisma.kiAiKnowledge.findFirst({
            where: { content: data.content },
        });
        if (existing) {
            throw new Error('Duplicate content found. Data dengan isi yang sama persis sudah ada.');
        }
        return prisma_1.prisma.kiAiKnowledge.create({ data });
    }
    async update(id, data) {
        // If content is changing, check for duplicates (excluding self)
        if (data.content) {
            const existing = await prisma_1.prisma.kiAiKnowledge.findFirst({
                where: {
                    content: data.content,
                    NOT: { id }
                },
            });
            if (existing) {
                throw new Error('Duplicate content found. Data dengan isi yang sama persis sudah ada.');
            }
        }
        return prisma_1.prisma.kiAiKnowledge.update({
            where: { id },
            data,
        });
    }
    async delete(id) {
        return prisma_1.prisma.kiAiKnowledge.delete({
            where: { id },
        });
    }
}
exports.KiAiKnowledgeService = KiAiKnowledgeService;
exports.kiAiKnowledgeService = new KiAiKnowledgeService();
