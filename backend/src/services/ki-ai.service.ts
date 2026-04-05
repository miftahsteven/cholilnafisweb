import { prisma } from '../lib/prisma';
import { Prisma } from '@prisma/client';

export class KiAiKnowledgeService {
  async getAll() {
    return prisma.kiAiKnowledge.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async getById(id: string) {
    return prisma.kiAiKnowledge.findUnique({
      where: { id },
    });
  }

  async create(data: any) {
    // Check for exact duplicate of content
    const existing = await prisma.kiAiKnowledge.findFirst({
      where: { content: data.content },
    });
    if (existing) {
      throw new Error('Duplicate content found. Data dengan isi yang sama persis sudah ada.');
    }
    return prisma.kiAiKnowledge.create({ data });
  }

  async update(id: string, data: any) {
    // If content is changing, check for duplicates (excluding self)
    if (data.content) {
      const existing = await prisma.kiAiKnowledge.findFirst({
        where: { 
          content: data.content,
          NOT: { id }
        },
      });
      if (existing) {
        throw new Error('Duplicate content found. Data dengan isi yang sama persis sudah ada.');
      }
    }
    return prisma.kiAiKnowledge.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    return prisma.kiAiKnowledge.delete({
      where: { id },
    });
  }
}

export const kiAiKnowledgeService = new KiAiKnowledgeService();
