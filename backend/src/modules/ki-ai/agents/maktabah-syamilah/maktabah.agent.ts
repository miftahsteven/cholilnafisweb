import { AgentRouteInput, AgentRouteResult, KiAiAgent, ChatSourcePayload } from '../../core/types';
import { maktabahRepository } from './maktabah.repository';
import { MAKTABAH_SYSTEM_PROMPT } from './maktabah.prompt';
import OpenAI from 'openai';
import { ChatCompletionMessageParam } from 'openai/resources/chat/completions';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export class MaktabahAgent implements KiAiAgent {
  async handle(input: AgentRouteInput): Promise<AgentRouteResult> {
    const { message, channel } = input;
    
    // Translate to Arabic keywords if needed
    let arabicQuery = message;
    try {
      const keywordResponse = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          { 
            role: 'system', 
            content: `You are an expert Islamic Jurisprudence (Feqh) scholar and Arabic lexicographer.
Your job is to translate a modern Indonesian/English Islamic question into 2-3 classical Arabic search terms (roots or keywords) used in traditional Feqh books (e.g. Maktabah Syamilah).

Rules:
1. Map modern concepts to classical Feqh terminology:
   - "paylater" / "kredit" -> "نسيئة" or "بيع الآجل" or "دين"
   - "investasi saham" -> "شركة" or "مضاربة"
   - "menikah" -> "نكاح" or "تزوج"
   - "wanita hamil" -> "حامل" or "حوامل"
   - "e-wallet" / "uang digital" -> "صرف" or "فلوس"
   - "bunga bank" -> "ربا"
2. Normalize the output: Do NOT include any harakat/diacritics, punctuation, or English letters.
3. Provide ONLY the Arabic words separated by spaces. (e.g., "نكاح حامل" or "شركة مضاربة"). Do not use quotes or any other characters.`
          },
          { role: 'user', content: message }
        ],
        temperature: 0.1,
      });
      let cleanQuery = keywordResponse.choices[0]?.message?.content?.trim() || message;
      // Remove any non-Arabic letters/spaces
      cleanQuery = cleanQuery.replace(/[^\u0600-\u06FF\s]/g, '').trim();
      arabicQuery = cleanQuery || message;
    } catch (e) {
      console.error('Translation error:', e);
    }
    
    // Search Maktabah Database
    const searchResults = await maktabahRepository.search(arabicQuery, 5);
    
    // Format Sources for LLM context and for Response
    const sources: ChatSourcePayload[] = searchResults.map(s => ({
      type: 'maktabah_syamilah',
      title: s.bookTitle,
      author: s.author,
      chapter: s.chapter,
      page: s.page,
      volume: s.volume,
      excerpt: s.excerpt,
      referenceId: s.id,
      url: s.url || null
    }));

    let contextText = searchResults.map((s, idx) => 
      `Sumber ${idx + 1}:\nKitab: ${s.bookTitle}\nPenulis: ${s.author || '-'}\nBab: ${s.chapter || '-'}\nJilid/Hal: ${s.volume || '-'}/${s.page || '-'}\nKutipan: ${s.excerpt}\n---`
    ).join('\n');

    if (!contextText) {
      contextText = "Tidak ada sumber kitab yang ditemukan dari database Maktabah Syamilah untuk pertanyaan ini.";
    }

    const messages: ChatCompletionMessageParam[] = [
      { role: 'system', content: MAKTABAH_SYSTEM_PROMPT },
      { role: 'system', content: `Context Kitab:\n${contextText}` },
      { role: 'user', content: message }
    ];

    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages,
      temperature: 0.3,
    });

    const answer = response.choices[0]?.message?.content || "Maaf, terjadi kesalahan.";

    return {
      success: true,
      agent: 'maktabah_syamilah',
      channel,
      answer,
      sources,
      confidence: searchResults.length > 0 ? 0.8 : 0.2,
      mode: 'maktabah'
    };
  }

  async *stream(input: AgentRouteInput): AsyncGenerator<any, void, unknown> {
    const { message, channel } = input;
    
    let arabicQuery = message;
    try {
      const keywordResponse = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          { 
            role: 'system', 
            content: `You are an expert Islamic Jurisprudence (Feqh) scholar and Arabic lexicographer.
Your job is to translate a modern Indonesian/English Islamic question into 2-3 classical Arabic search terms (roots or keywords) used in traditional Feqh books (e.g. Maktabah Syamilah).

Rules:
1. Map modern concepts to classical Feqh terminology:
   - "paylater" / "kredit" -> "نسيئة" or "بيع الآجل" or "دين"
   - "investasi saham" -> "شركة" or "مضاربة"
   - "menikah" -> "نكاح" or "تزوج"
   - "wanita hamil" -> "حامل" or "حوامل"
   - "e-wallet" / "uang digital" -> "صرف" or "فلوس"
   - "bunga bank" -> "ربا"
2. Normalize the output: Do NOT include any harakat/diacritics, punctuation, or English letters.
3. Provide ONLY the Arabic words separated by spaces. (e.g., "نكاح حامل" or "شركة مضاربة"). Do not use quotes or any other characters.`
          },
          { role: 'user', content: message }
        ],
        temperature: 0.1,
      });
      let cleanQuery = keywordResponse.choices[0]?.message?.content?.trim() || message;
      // Remove any non-Arabic letters/spaces
      cleanQuery = cleanQuery.replace(/[^\u0600-\u06FF\s]/g, '').trim();
      arabicQuery = cleanQuery || message;
    } catch (e) {
      console.error('Translation error:', e);
    }

    const searchResults = await maktabahRepository.search(arabicQuery, 5);
    
    const sources: ChatSourcePayload[] = searchResults.map(s => ({
      type: 'maktabah_syamilah',
      title: s.bookTitle,
      author: s.author,
      chapter: s.chapter,
      page: s.page,
      volume: s.volume,
      excerpt: s.excerpt,
      referenceId: s.id,
      url: s.url || null
    }));

    // Send metadata immediately
    yield {
      type: 'metadata',
      data: { 
        mode: 'maktabah', 
        confidence: searchResults.length > 0 ? 0.8 : 0.2, 
        sources 
      }
    };

    let contextText = searchResults.map((s, idx) => 
      `Sumber ${idx + 1}:\nKitab: ${s.bookTitle}\nPenulis: ${s.author || '-'}\nBab: ${s.chapter || '-'}\nJilid/Hal: ${s.volume || '-'}/${s.page || '-'}\nKutipan: ${s.excerpt}\n---`
    ).join('\n');

    if (!contextText) {
      contextText = "Tidak ada sumber kitab yang ditemukan dari database Maktabah Syamilah untuk pertanyaan ini.";
    }

    const messages: ChatCompletionMessageParam[] = [
      { role: 'system', content: MAKTABAH_SYSTEM_PROMPT },
      { role: 'system', content: `Context Kitab:\n${contextText}` },
      { role: 'user', content: message }
    ];

    const streamObj = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages,
      temperature: 0.3,
      stream: true,
    });

    for await (const chunk of streamObj) {
      const content = chunk.choices[0]?.delta?.content || '';
      if (content) {
        yield { type: 'chunk', data: content };
      }
    }
  }
}

export const maktabahAgent = new MaktabahAgent();
