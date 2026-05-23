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
        // Try with all keywords first, then reduce if no results
        for (let i = keywords.length; i > 0; i--) {
          const currentKeywords = keywords.slice(0, i);
          const likeConditions = currentKeywords.map((_, idx) => `nass ILIKE $${idx + 1}`).join(' AND ');
          const sql = `
            SELECT id, nass as "contentAr", page, part as volume, source_file
            FROM maktabah_book
            WHERE ${likeConditions}
            LIMIT $${currentKeywords.length + 1}
          `;
          
          const params = [...currentKeywords.map(k => `%${k}%`), limit];
          results = await prismaMaktabah.$queryRawUnsafe(sql, ...params);
          
          if (results.length > 0) {
            break; // Found results, stop reducing keywords
          }
        }
      } else {
        // Fallback exact match
        const exactMatchParams = [`%${query}%`, limit];
        results = await prismaMaktabah.$queryRawUnsafe(`
          SELECT id, nass as "contentAr", page, part as volume, source_file
          FROM maktabah_book
          WHERE nass ILIKE $1
          LIMIT $2
        `, ...exactMatchParams);
      }

      return results.map((record: any, index: number) => {
        // Clean source_file from .csv
        let bookName = record.source_file || 'Unknown Book';
        bookName = bookName.replace('-book.csv', '');
        return {
          id: String(record.id),
          bookTitle: `Kitab Maktabah (${bookName})`,
          author: '-',
          chapter: '-',
          page: record.page ? Number(record.page) : undefined,
          volume: record.volume ? Number(record.volume) : undefined,
          excerpt: record.contentAr,
          score: 1.0 - (index * 0.1) // simple mock score based on order
        };
      });
    } catch (e) {
      console.error('Maktabah Search Error:', e);
      return [];
    }
  }
}

export const maktabahRepository = new MaktabahRepository();
