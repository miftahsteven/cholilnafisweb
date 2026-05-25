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
  url?: string | null;
};

const MAKTABAH_BOOKS_MAP: Record<string, { title: string; author: string }> = {
  '1350': { title: 'Zad al-Masir fi \'Ilm al-Tafsir (زاد المسير في علم التفسير)', author: 'Ibn al-Jawzi (ابن الجوزي)' },
  '4180': { title: 'Al-Adillah ar-Radiyyah Sharh al-Durar al-Bahiyyah (الأدلة الرضية لمتن الدرر البهية)', author: 'Imam Asy-Syaukani (الإمام الشوكاني)' },
  '1299': { title: 'Tafsir Al-Bahr Al-Muhit (تفسير البحر المحيط)', author: 'Abu Hayyan al-Andalusi (أبو حيان الأندلسي)' },
  '1340': { title: 'Tanwir al-Miqbas min Tafsir Ibn \'Abbas (تنوير المقباس من تفسير ابن عباس)', author: 'Ibn \'Abbas / Al-Fayruzabadi (ابن عباس / الفيروزآبادي)' },
  '1680': { title: 'Hidayat al-Qari ila Tajwid Kalam al-Bari (هداية القاري إلى تجويد كلام الباري)', author: 'Abdul Fattah al-Marsafi (عبد الفتاح المرصفي)' },
  '2749': { title: 'Al-Durar al-Muntathirah fi al-Ahadith al-Mushtaharah (الدرر المنتثرة في الأحاديث المشتهرة)', author: 'Jalaluddin al-Suyuthi (جلال الدين السيوطي)' },
  '9710': { title: 'Gharib al-Qur\'an al-Musamma Nuzhat al-Qulub (غريب القرآن المسمى بنزهة القلوب)', author: 'Abu Bakr al-Sijistani (أبو بكر السجستاني)' },
  '9730': { title: 'Itsbat Sifat al-\'Uluw (إثبات صفة العلو)', author: 'Ibn Qudamah al-Maqdisi (ابن قدامة المقدسي)' },
  '9740': { title: 'Ghidza al-Albab Sharh Manzhumah al-Adab (غذاء الألباب في شرح منظومة الآداب)', author: 'Imam As-Safarini (الإمام السفاريني)' }
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

      const mappedResults = await Promise.all(results.map(async (record: any, index: number) => {
        // Clean source_file from .csv
        let bookCode = record.source_file || 'Unknown Book';
        bookCode = bookCode.replace('-book.csv', '');
        
        const bookInfo = MAKTABAH_BOOKS_MAP[bookCode] || {
          title: `Kitab Maktabah (${bookCode})`,
          author: '-'
        };

        // Find the chapter title dynamically from maktabah_title
        let chapterName = '-';
        try {
          const titleFile = `${bookCode}-title.csv`;
          const recordIdNum = Number(record.id);
          if (!isNaN(recordIdNum)) {
            const titleQuery: any[] = await prismaMaktabah.$queryRawUnsafe(`
              SELECT tit FROM maktabah_title 
              WHERE source_file = $1 AND id::integer <= $2
              ORDER BY id::integer DESC
              LIMIT 1
            `, titleFile, recordIdNum);
            
            if (titleQuery.length > 0 && titleQuery[0].tit) {
              chapterName = titleQuery[0].tit;
            }
          }
        } catch (chapterErr) {
          console.error('Chapter resolution error:', chapterErr);
        }

        return {
          id: String(record.id),
          bookTitle: bookInfo.title,
          author: bookInfo.author,
          chapter: chapterName,
          page: record.page ? Number(record.page) : undefined,
          volume: record.volume ? Number(record.volume) : undefined,
          excerpt: record.contentAr,
          score: 1.0 - (index * 0.1),
          url: `https://shamela.ws/book/${bookCode}`
        };
      }));

      return mappedResults;
    } catch (e) {
      console.error('Maktabah Search Error:', e);
      return [];
    }
  }
}

export const maktabahRepository = new MaktabahRepository();
