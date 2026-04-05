import { prisma } from '../../../lib/prisma';

export interface InternalKnowledgeResult {
  content: string;
  score: number;
  sourceType: string;
  sourceUrl?: string | null;
  title?: string | null;
}

export class KnowledgeEngine {
  /**
   * Cari data dari internal knowledge (KiAiKnowledge) menggunakan Full Text Search PostgreSQL.
   */
  async search(query: string, limit: number = 5): Promise<InternalKnowledgeResult[]> {
    // Note: To implement full text search safely using prisma.$queryRaw
    // we use `plainto_tsquery` and `to_tsvector`.
    // We assume the language is standard/indonesian but postgres uses english/simple config.
    const results = await prisma.$queryRaw`
      SELECT 
        id, 
        title, 
        content,
        "sourceLink" as "sourceUrl",
        ts_rank(to_tsvector('simple', content), websearch_to_tsquery('simple', ${query})) as score
      FROM ki_ai_knowledge
      WHERE to_tsvector('simple', content) @@ websearch_to_tsquery('simple', ${query})
        AND status = 'PUBLISHED'
      ORDER BY score DESC
      LIMIT ${limit}
    `;

    return (results as any[]).map((row) => ({
      title: row.title,
      content: row.content,
      score: row.score,
      sourceType: 'internal',
      sourceUrl: row.sourceUrl,
    }));
  }
}

export const knowledgeEngine = new KnowledgeEngine();
