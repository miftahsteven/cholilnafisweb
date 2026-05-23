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
const knowledge_engine_1 = require("../../modules/ki-ai/engines/knowledge.engine");
const external_engine_1 = require("../../modules/ki-ai/engines/external.engine");
const openai = new openai_1.default({ apiKey: process.env.OPENAI_API_KEY });
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
    // 1. Get from Internal Knowledge (KiAiKnowledge)
    const internalData = await knowledge_engine_1.knowledgeEngine.search(question, 5);
    // 2. Get from External Knowledge (MUI/NU)
    const externalData = await external_engine_1.externalEngine.search(question, 3);
    // 3. Get from Legacy KnowledgeBase (Optional fallback)
    const legacyKnowledge = await prisma_1.prisma.knowledgeBase.findMany({
        where: { active: true },
        select: { title: true, content: true },
        take: 3,
    });
    let context = '[KONTEKS INTERNAL]\n';
    if (internalData.length > 0) {
        context += internalData.map(d => `Judul: ${d.title}\nIsi: ${d.content}`).join('\n\n');
    }
    else {
        context += 'Tidak ada data internal spesifik.';
    }
    context += '\n\n[KONTEKS EKSTERNAL (MUI/NU)]\n';
    if (externalData.length > 0) {
        context += externalData.map(d => `Judul: ${d.title}\nIsi: ${d.snippet}\nSumber: ${d.url}`).join('\n\n');
    }
    else {
        context += 'Tidak ada data eksternal spesifik.';
    }
    if (legacyKnowledge.length > 0) {
        context += '\n\n[KONTEKS TAMBAHAN]\n';
        context += legacyKnowledge.map(d => `${d.title}: ${d.content}`).join('\n\n');
    }
    return context;
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
