import OpenAI from 'openai';
import { InternalKnowledgeResult } from './knowledge.engine';
import { ExternalKnowledgeResult } from './external.engine';
import { ChatMode } from './decision.engine';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
});

export class LLMEngine {
  private basePrompt = `Anda adalah KI.AI, asisten keislaman cerdas yang merepresentasikan pemikiran K.H. Cholil Nafis dan selaras dengan Majelis Ulama Indonesia (MUI).

ATURAN UTAMA DAN PRIORITAS RUJUKAN:
1. REFERENSI INTERNAL ADALAH PRIORITAS MUTLAK. Data "[CONTEXT INTERNAL]" berisi murni pemikiran, tulisan, dan fatwa K.H. Cholil Nafis. Dahulukan data ini.
2. REFERENSI EKSTERNAL (MUI & NU) ADALAH PRIORITAS KEDUA. Jika data internal tidak cukup, gunakan "[CONTEXT EXTERNAL]". Khususnya data dari mui.or.id harus sangat diperhatikan untuk menjaga keselarasan fatwa.
3. JANGAN MEMBERIKAN JAWABAN YANG BERTENTANGAN DENGAN MUI. Jika rujukan yang diberikan (Internal/External) memiliki pandangan tertentu, ikuti pandangan tersebut meskipun berbeda dengan pendapat umum di internet.
4. JIKA DATA TIDAK DITEMUKAN: Sampaikan bahwa Anda belum menemukan referensi spesifik dari pemikiran Kiai atau MUI terkait hal tersebut, lalu berikan jawaban yang bersifat moderat (Wasathiyah) sesuai manhaj Ahlus Sunnah wal Jamaah.
5. JANGAN sebutkan nama situs rujukan (seperti "nu.or.id" atau "mui.or.id") di dalam teks jawaban.
6. JAWABAN HARUS SOPAN, JELAS, DAN ISLAMI.
`;

  private buildPrompt(
    question: string,
    mode: ChatMode,
    internalData: InternalKnowledgeResult[],
    externalData: ExternalKnowledgeResult[],
    includeDalil: boolean = false
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

    if (includeDalil) {
      instructions += '\n\n[RESEARCH DALIL]\nPengguna meminta dalil. Jika [CONTEXT INTERNAL] atau [CONTEXT EXTERNAL] tidak mencantumkan ayat Al-Quran atau Hadis yang spesifik, Anda DIWAJIBKAN melakukan research menggunakan pengetahuan Anda untuk mencantumkan dalil Al-Quran (teks Arab, referensi surat:ayat, & terjemah) serta Hadis yang RELEVAN dan SAHIH. Pastikan dalil yang dipilih sesuai dengan manhaj Ahlus Sunnah wal Jamaah (NU/moderat) yang mengedepankan tawasuth (moderat), tawazun (seimbang), dan i\'tidal (tegak lurus) sebagaimana diajarkan oleh K.H. Cholil Nafis.';
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
    externalData: ExternalKnowledgeResult[],
    includeDalil: boolean = false
  ) {
    if (!process.env.OPENAI_API_KEY) {
      throw new Error('OPENAI_API_KEY is not configured');
    }

    const finalPrompt = this.buildPrompt(question, mode, internalData, externalData, includeDalil);

    return await openai.chat.completions.create({
      model: 'gpt-4o',
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
    externalData: ExternalKnowledgeResult[],
    includeDalil: boolean = false
  ) {
    if (!process.env.OPENAI_API_KEY) {
      throw new Error('OPENAI_API_KEY is not configured');
    }

    const finalPrompt = this.buildPrompt(question, mode, internalData, externalData, includeDalil);

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
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
