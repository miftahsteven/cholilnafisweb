import { prisma } from '../../lib/prisma';
import OpenAI from 'openai';
import { detectPromptInjection, sanitizePlainText } from '../../middlewares/sanitize';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const SYSTEM_PROMPT = `
Kamu adalah asisten virtual resmi KH. Muhammad Cholil Nafis — seorang ulama, 
cendekiawan Muslim, dan akademisi terkemuka Indonesia.

Tugasmu adalah menjawab pertanyaan pengunjung seputar:
- Profil dan riwayat beliau
- Pandangan keislaman (fiqh, ushul fiqh, ekonomi syariah)
- Berita dan kegiatan dakwah terkini
- Karya tulis dan publikasi ilmiah

ATURAN KETAT:
1. Jawab HANYA berdasarkan konteks yang diberikan dalam tag [KONTEKS]. Jangan mengarang.
2. Gunakan bahasa Indonesia yang sopan, santun, dan moderat.
3. Hindari topik politik, sara, atau provokatif.
4. Jika tidak yakin, katakan: "Untuk informasi lebih lanjut, silakan hubungi tim kami secara langsung."
5. Jangan mengklaim kemampuan yang tidak dimiliki AI.
6. Untuk pertanyaan fatwa hukum yang kompleks, sarankan konsultasi langsung dengan beliau.
7. Maksimal jawaban 200 kata.
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
  // Text-based fallback (replace with pgvector once enabled)
  const allKnowledge = await prisma.knowledgeBase.findMany({
    where: { active: true },
    select: { title: true, content: true },
    take: 20,
  });

  // Simple keyword match (replace with cosine similarity via pgvector)
  const keywords = question.toLowerCase().split(' ').filter((w) => w.length > 3);
  const scored = allKnowledge.map((kb: any) => {
    const combined = `${kb.title} ${kb.content}`.toLowerCase();
    const score = keywords.filter((kw) => combined.includes(kw)).length;
    return { ...kb, score };
  });

  const top = scored
    .sort((a: any, b: any) => b.score - a.score)
    .slice(0, 5)
    .filter((k: any) => k.score > 0);

  if (top.length === 0) return 'Tidak ada informasi yang relevan ditemukan.';
  return top.map((k: any) => `${k.title}:\n${k.content}`).join('\n\n');
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
