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
2. Jika menjawab dari "[CONTEXT INTERNAL]", sampaikan dengan bahasa yang mengalir tanpa harus kaku menyebutkan kata "sumber".
3. JIKA DAN HANYA JIKA data internal tidak tersedia atau tidak cukup menjawab, BARU Anda diizinkan menggunakan "[CONTEXT EXTERNAL]" (web NU dan MUI).
4. Fokuslah pada substansi jawaban. JANGAN menyebutkan nama situs rujukan (seperti "nu.or.id" atau "mui.or.id") di dalam teks jawaban, karena rujukan tersebut sudah ditampilkan secara otomatis di bagian bawah.
5. Jangan membuat fatwa baru di luar referensi. Jika tidak ada referensi sama sekali, katakan tidak memadai.
6. Jawaban harus sopan, jelas, dan Islami.
`;

  private buildPrompt(
    question: string,
    mode: ChatMode,
    internalData: InternalKnowledgeResult[],
    externalData: ExternalKnowledgeResult[]
  ) {
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
      instructions += 'Dahulukan [CONTEXT INTERNAL] (Pemikiran K.H. Cholil Nafis). Apabila benar-benar kurang, baru lengkapi dengan [CONTEXT EXTERNAL] dari MUI/NU. Fokus pada isi jawaban saja, jangan sebutkan nama situs rujukan.';
    } else if (mode === 'external') {
      instructions += 'Data internal [CONTEXT INTERNAL] KOSONG. Jawab menggunakan rujukan eksternal [CONTEXT EXTERNAL]. Sajikan jawaban langsung tanpa menyebutkan asal situs atau link situs di dalam kalimat.';
    } else {
      instructions += 'BERHENTI. Tidak ada data internal maupun eksternal. Sampaikan permohonan maaf bahwa data belum tersedia.';
    }

    return `
${this.basePrompt}

[PERTANYAAN USER]
${question}
${contextText}
${instructions}
`;
  }

  async buildAndStreamPrompt(
    question: string,
    mode: ChatMode,
    internalData: InternalKnowledgeResult[],
    externalData: ExternalKnowledgeResult[]
  ) {
    if (!process.env.OPENAI_API_KEY) {
      throw new Error('OPENAI_API_KEY is not configured');
    }

    const finalPrompt = this.buildPrompt(question, mode, internalData, externalData);

    return await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: this.basePrompt },
        { role: 'user', content: finalPrompt },
      ],
      stream: true,
      temperature: 0.2,
    });
  }

  async generate(
    question: string,
    mode: ChatMode,
    internalData: InternalKnowledgeResult[],
    externalData: ExternalKnowledgeResult[]
  ) {
    if (!process.env.OPENAI_API_KEY) {
      throw new Error('OPENAI_API_KEY is not configured');
    }

    const finalPrompt = this.buildPrompt(question, mode, internalData, externalData);

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: this.basePrompt },
        { role: 'user', content: finalPrompt },
      ],
      stream: false,
      temperature: 0.2,
    });

    return completion.choices[0].message.content || '';
  }
}

export const llmEngine = new LLMEngine();
