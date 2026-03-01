"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateEmbedding = generateEmbedding;
exports.processChatbotQuestion = processChatbotQuestion;
const prisma_1 = require("../../lib/prisma");
const openai_1 = __importDefault(require("openai"));
const sanitize_1 = require("../../middlewares/sanitize");
const openai = new openai_1.default({ apiKey: process.env.OPENAI_API_KEY });
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
async function generateEmbedding(text) {
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
async function retrieveRelevantContext(question) {
    // Text-based fallback (replace with pgvector once enabled)
    const allKnowledge = await prisma_1.prisma.knowledgeBase.findMany({
        where: { active: true },
        select: { title: true, content: true },
        take: 20,
    });
    // Simple keyword match (replace with cosine similarity via pgvector)
    const keywords = question.toLowerCase().split(' ').filter((w) => w.length > 3);
    const scored = allKnowledge.map((kb) => {
        const combined = `${kb.title} ${kb.content}`.toLowerCase();
        const score = keywords.filter((kw) => combined.includes(kw)).length;
        return { ...kb, score };
    });
    const top = scored
        .sort((a, b) => b.score - a.score)
        .slice(0, 5)
        .filter((k) => k.score > 0);
    if (top.length === 0)
        return 'Tidak ada informasi yang relevan ditemukan.';
    return top.map((k) => `${k.title}:\n${k.content}`).join('\n\n');
}
async function processChatbotQuestion(input) {
    const cleanQuestion = (0, sanitize_1.sanitizePlainText)(input.question);
    // Prompt injection check
    if ((0, sanitize_1.detectPromptInjection)(cleanQuestion)) {
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
    await prisma_1.prisma.chatLog.create({
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
