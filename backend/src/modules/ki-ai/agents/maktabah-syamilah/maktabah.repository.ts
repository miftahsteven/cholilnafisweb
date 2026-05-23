import { prismaMaktabah } from '../../../../lib/prisma-maktabah';

export type MaktabahSource = {
  id: string;
  bookTitle: string;
  author?: string;
  chapter?: string;
  page?: number;
  volume?: number;
  excerpt: string;
  score: number;
};

export class MaktabahRepository {
  async search(query: string, limit: number = 5): Promise<MaktabahSource[]> {
    try {
      // Tahap 1: PostgreSQL Full Text Search (jika sudah dikonfigurasi)
      // Sementara menggunakan ILIKE untuk fallback jika FTS belum optimal
      const keywords = query.split(' ').filter(k => k.length > 2);
      
      let results: any[] = [];
      
      if (keywords.length > 0) {
        const likeConditions = keywords.map((_, i) => `"contentAr" ILIKE $${i + 1}`).join(' AND ');
        const sql = `
          SELECT c.id, c."contentAr", c.page, c.volume, 
                 b.title as "bookTitle", b.author,
                 ch.title as "chapterTitle"
          FROM maktabah_contents c
          JOIN maktabah_books b ON c."bookId" = b.id
          LEFT JOIN maktabah_chapters ch ON c."chapterId" = ch.id
          WHERE ${likeConditions}
          LIMIT $${keywords.length + 1}
        `;
        
        const params = [...keywords.map(k => `%${k}%`), limit];
        results = await prismaMaktabah.$queryRawUnsafe(sql, ...params);
      } else {
        // Fallback exact match
        results = await prismaMaktabah.$queryRaw`
          SELECT c.id, c."contentAr", c.page, c.volume, 
                 b.title as "bookTitle", b.author,
                 ch.title as "chapterTitle"
          FROM maktabah_contents c
          JOIN maktabah_books b ON c."bookId" = b.id
          LEFT JOIN maktabah_chapters ch ON c."chapterId" = ch.id
          WHERE c."contentAr" ILIKE ${'%' + query + '%'}
          LIMIT ${limit}
        `;
      }

      return results.map((record: any, index: number) => ({
        id: String(record.id),
        bookTitle: record.bookTitle || 'Unknown Book',
        author: record.author,
        chapter: record.chapterTitle,
        page: record.page,
        volume: record.volume,
        excerpt: record.contentAr,
        score: 1.0 - (index * 0.1) // simple mock score based on order
      }));
    } catch (e) {
      console.error('Maktabah Search Error:', e);
      return [];
    }
  }
}

export const maktabahRepository = new MaktabahRepository();
