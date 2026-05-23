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
    
    // Simple normalization and query generation (could be LLM based in the future)
    const normalizedQuery = message;
    
    // Search Maktabah Database
    const searchResults = await maktabahRepository.search(normalizedQuery, 5);
    
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
      url: null // Maktabah references usually don't have URLs in this setup
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
    
    const searchResults = await maktabahRepository.search(message, 5);
    
    const sources: ChatSourcePayload[] = searchResults.map(s => ({
      type: 'maktabah_syamilah',
      title: s.bookTitle,
      author: s.author,
      chapter: s.chapter,
      page: s.page,
      volume: s.volume,
      excerpt: s.excerpt,
      referenceId: s.id,
      url: null
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
