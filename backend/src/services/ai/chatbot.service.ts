import { prisma } from '../../lib/prisma';
import OpenAI from 'openai';
import { detectPromptInjection, sanitizePlainText } from '../../middlewares/sanitize';
import { knowledgeEngine } from '../../modules/ki-ai/engines/knowledge.engine';
import { externalEngine } from '../../modules/ki-ai/engines/external.engine';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const SYSTEM_PROMPT = `
Anda adalah KI.AI, asisten virtual resmi K.H. Cholil Nafis — seorang ulama, 
cendekiawan Muslim, dan akademisi terkemuka Indonesia yang selaras dengan Majelis Ulama Indonesia (MUI).

Tugasmu adalah menjawab pertanyaan pengunjung seputar:
- Profil dan riwayat beliau
- Pandangan keislaman (fiqh, ushul fiqh, ekonomi syariah)
- Berita dan kegiatan dakwah terkini (terutama fatwa-fatwa terbaru MUI)
- Karya tulis dan publikasi ilmiah

ATURAN KETAT DAN PRIORITAS:
1. PRIORITAS UTAMA: Gunakan data [KONTEKS INTERNAL] yang berisi pemikiran MURNI K.H. Cholil Nafis.
2. PRIORITAS KEDUA: Gunakan data [KONTEKS EKSTERNAL] dari MUI atau NU. Dahulukan pandangan MUI untuk menjaga keselarasan fatwa.
3. JANGAN JAWAB dari pengetahuan umum internet jika bertentangan dengan rujukan yang diberikan.
4. PERHATIKAN FATWA KRUSIAL: Contohnya, Fatwa MUI menyatakan penyembelihan Dam haji di luar Tanah Haram adalah TIDAK SAH. Jangan sampai memberikan informasi yang salah mengenai hal-benar ritual seperti ini.
5. Jawab dengan bahasa Indonesia yang sopan, santun, dan moderat (Wasathiyah).
6. Hindari topik politik praktis, sara, atau provokatif.
7. Jika tidak yakin atau tidak ada rujukan, katakan: "Untuk informasi lebih lanjut, silakan hubungi tim kami secara langsung."
8. Jangan menyebutkan nama situs rujukan (seperti "mui.or.id") di dalam kalimat jawaban.
9. Maksimal jawaban 300 kata.
`.trim();

/**
 * Generate embedding vector from text using OpenAI
 */
export async function generateEmbedding(text: string): Promise<number[]> {
  const response = await openai.embeddings.create({
    model: 'text-embedding-3-small',
    input: text,
  });
  return response.data[0].embedding;
}

/**
 * Find relevant knowledge base entries using vector similarity search
 * Note: requires pgvector extension and vector column in knowledge_base table
 * For now, falls back to text-based keyword matching until pgvector is set up
 */
async function retrieveRelevantContext(question: string): Promise<string> {
  // 1. Get from Internal Knowledge (KiAiKnowledge)
  const internalData = await knowledgeEngine.search(question, 5);
  
  // 2. Get from External Knowledge (MUI/NU)
  const externalData = await externalEngine.search(question, 3);

  // 3. Get from Legacy KnowledgeBase (Optional fallback)
  const legacyKnowledge = await prisma.knowledgeBase.findMany({
    where: { active: true },
    select: { title: true, content: true },
    take: 3,
  });

  let context = '[KONTEKS INTERNAL]\n';
  if (internalData.length > 0) {
    context += internalData.map(d => `Judul: ${d.title}\nIsi: ${d.content}`).join('\n\n');
  } else {
    context += 'Tidak ada data internal spesifik.';
  }

  context += '\n\n[KONTEKS EKSTERNAL (MUI/NU)]\n';
  if (externalData.length > 0) {
    context += externalData.map(d => `Judul: ${d.title}\nIsi: ${d.snippet}\nSumber: ${d.url}`).join('\n\n');
  } else {
    context += 'Tidak ada data eksternal spesifik.';
  }

  if (legacyKnowledge.length > 0) {
    context += '\n\n[KONTEKS TAMBAHAN]\n';
    context += legacyKnowledge.map(d => `${d.title}: ${d.content}`).join('\n\n');
  }

  return context;
}

interface ChatbotInput {
  question: string;
  sessionId: string;
  ipHash?: string;
}

interface ChatbotOutput {
  answer: string;
  sessionId: string;
  tokens?: number;
}

export async function processChatbotQuestion(input: ChatbotInput): Promise<ChatbotOutput> {
  const cleanQuestion = sanitizePlainText(input.question);

  // Prompt injection check
  if (detectPromptInjection(cleanQuestion)) {
    return { answer: 'Maaf, pertanyaan Anda tidak dapat diproses.', sessionId: input.sessionId };
  }

  const context = await retrieveRelevantContext(cleanQuestion);

  const completion = await openai.chat.completions.create({
    model: 'gpt-4o',
    max_tokens: 300,
    messages: [
      { role: 'system', content: SYSTEM_PROMPT },
      {
        role: 'user',
        content: `[KONTEKS]\n${context}\n\n[PERTANYAAN]\n${cleanQuestion}`,
      },
    ],
  });

  const answer = completion.choices[0]?.message?.content || 'Maaf, saya tidak dapat memberikan jawaban saat ini.';
  const tokens = completion.usage?.total_tokens;

  // Log to database
  await prisma.chatLog.create({
    data: {
      sessionId: input.sessionId,
      question: cleanQuestion,
      answer,
      ipHash: input.ipHash,
      tokens: tokens ?? null,
    },
  });

  return { answer, sessionId: input.sessionId, tokens };
}
