"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.knowledgeEngine = exports.KnowledgeEngine = void 0;
const prisma_1 = require("../../../lib/prisma");
class KnowledgeEngine {
    /**
     * Cari data dari internal knowledge (KiAiKnowledge) menggunakan Full Text Search PostgreSQL.
     */
    async search(query, limit = 5) {
        // Note: To implement full text search safely using prisma.$queryRaw
        // we use `plainto_tsquery` and `to_tsvector`.
        // We assume the language is standard/indonesian but postgres uses english/simple config.
        const results = await prisma_1.prisma.$queryRaw `
      SELECT 
        id, 
        title, 
        content,
        "sourceLink" as "sourceUrl",
        ts_rank(
          to_tsvector('simple', coalesce(title, '') || ' ' || content || ' ' || coalesce(keywords, '')), 
          websearch_to_tsquery('simple', ${query})
        ) as score
      FROM ki_ai_knowledge
      WHERE to_tsvector('simple', coalesce(title, '') || ' ' || content || ' ' || coalesce(keywords, '')) @@ websearch_to_tsquery('simple', ${query})
        AND status = 'PUBLISHED'
      ORDER BY score DESC
      LIMIT ${limit}
    `;
        return results.map((row) => ({
            title: row.title,
            content: row.content,
            score: row.score,
            sourceType: 'internal',
            sourceUrl: row.sourceUrl,
        }));
    }
}
exports.KnowledgeEngine = KnowledgeEngine;
exports.knowledgeEngine = new KnowledgeEngine();
