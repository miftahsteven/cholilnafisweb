import OpenAI from 'openai';
import { InternalKnowledgeResult } from './knowledge.engine';
import { ExternalKnowledgeResult } from './external.engine';
import { ChatMode } from './decision.engine';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
});

export class LLMEngine {
  private basePrompt = `Anda adalah KI.AI, asisten keislaman cerdas.

ATURAN UTAMA DAN PRIORITAS RUJUKAN:
1. REFERENSI INTERNAL ADALAH PRIORITAS MUTLAK. Data "[CONTEXT INTERNAL]" ini berisi murni pemikiran, tulisan, dan data K.H. Cholil Nafis. Dahulukan data ini daripada apapun.
2. Jika menjawab dari "[CONTEXT INTERNAL]", sebutkan tanpa menyebutkan kata "sumber" yang kaku, atau cukup sebutkan rujukannya dari "mcnid.net" atau "Pemikiran K.H. Cholil Nafis".
3. JIKA DAN HANYA JIKA data internal tidak tersedia atau tidak cukup menjawab, BARU Anda diizinkan menggunakan "[CONTEXT EXTERNAL]" (web NU dan MUI).
4. Jika menggunakan referensi eksternal, SELALU tampilkan judul dari konten rujukan tersebut secara utuh dan sebut situsnya (MUI/NU).
5. Jangan membuat fatwa baru di luar referensi. Jika tidak ada referensi sama sekali, katakan tidak memadai.
6. Jawaban harus sopan, jelas, dan Islami.
`;

  async buildAndStreamPrompt(
    question: string,
    mode: ChatMode,
    internalData: InternalKnowledgeResult[],
    externalData: ExternalKnowledgeResult[]
  ) {
    if (!process.env.OPENAI_API_KEY) {
      throw new Error('OPENAI_API_KEY is not configured');
    }

    let contextText = '';

    if (mode === 'internal' || mode === 'hybrid') {
      contextText += '\n[CONTEXT INTERNAL]\n';
      internalData.forEach((item, i) => {
        contextText += `Data ${i + 1}:\nJudul: ${item.title || '-'}\nIsi: ${item.content}\n\n`;
      });
    }

    if (mode === 'external' || mode === 'hybrid') {
      contextText += '\n[CONTEXT EXTERNAL]\n';
      externalData.forEach((item, i) => {
        contextText += `Referensi ${i + 1}:\nJudul: ${item.title}\nIsi: ${item.snippet}\nSitus: ${item.sourceType === 'mui' ? 'mui.or.id' : 'nu.or.id'}\n\n`;
      });
    }

    let instructions = '\n[INSTRUKSI]\n';
    if (mode === 'internal') {
      instructions += 'Gunakan data [CONTEXT INTERNAL] sepenuhnya. Ini adalah pemikiran MURNI K.H. Cholil Nafis. Jangan mencari ke eksternal.';
    } else if (mode === 'hybrid') {
      instructions += 'Dahulukan [CONTEXT INTERNAL] (Pemikiran K.H. Cholil Nafis). Apabila benar-benar kurang, baru lengkapi dengan [CONTEXT EXTERNAL] dari MUI/NU, dan WAJIB menyebutkan judul konten MUI/NU tersebut.';
    } else if (mode === 'external') {
      instructions += 'Data internal [CONTEXT INTERNAL] KOSONG. Jawab menggunakan rujukan eksternal [CONTEXT EXTERNAL] dan Anda HARUS menyebutkan judul konten dan asal situsnya (NU/MUI).';
    } else {
      instructions += 'BERHENTI. Tidak ada data internal maupun eksternal. Sampaikan permohonan maaf bahwa data belum tersedia.';
    }

    const finalPrompt = `
${this.basePrompt}

[PERTANYAAN USER]
${question}
${contextText}
${instructions}
`;

    // Kita kembalikan stream dari OpenAI
    return await openai.chat.completions.create({
      model: 'gpt-4o-mini', // atau 'gpt-4o' menyesuaikan kebutuhan
      messages: [
        { role: 'system', content: this.basePrompt },
        { role: 'user', content: finalPrompt },
      ],
      stream: true,
      temperature: 0.2, // Low temperature for more deterministic/factual answers
    });
  }
}

export const llmEngine = new LLMEngine();
