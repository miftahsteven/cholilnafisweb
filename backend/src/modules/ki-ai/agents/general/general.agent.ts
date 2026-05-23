import { AgentRouteInput, AgentRouteResult, KiAiAgent } from '../../core/types';
import { knowledgeEngine } from '../../engines/knowledge.engine';
import { externalEngine, ExternalKnowledgeResult } from '../../engines/external.engine';
import { decisionEngine } from '../../engines/decision.engine';
import { llmEngine } from '../../engines/llm.engine';

export class GeneralAgent implements KiAiAgent {
  async handle(input: AgentRouteInput): Promise<AgentRouteResult> {
    const { message, channel } = input;
    
    // 1. Search internal knowledge
    const internalResults = await knowledgeEngine.search(message, 5);

    // 2. Decide Mode
    const decision = decisionEngine.decideMode(internalResults);
    const { mode, confidence } = decision;

    // 3. Search external if needed
    let externalResults: ExternalKnowledgeResult[] = [];
    if (mode === 'hybrid' || mode === 'external') {
      externalResults = await externalEngine.search(message, 3);
    }

    const sources = [
      ...internalResults.map(r => ({ type: 'internal', title: r.title, url: r.sourceUrl || null })),
      ...externalResults.map(r => ({ type: r.sourceType, title: r.title, url: r.url }))
    ];

    // 4. Call LLM
    const dalilKeywords = ['dalil', 'ayat', 'alquran', 'al-quran', 'hadis', 'hadist', 'sumber', 'teks arab', 'nas '];
    const includeDalil = dalilKeywords.some(kw => message.toLowerCase().includes(kw));

    const fullAnswer = await llmEngine.generate(message, mode, internalResults, externalResults, includeDalil);

    return {
      success: true,
      agent: 'general',
      channel: channel,
      answer: fullAnswer,
      sources,
      confidence,
      mode
    };
  }

  async *stream(input: AgentRouteInput): AsyncGenerator<any, void, unknown> {
    const { message } = input;
    
    const internalResults = await knowledgeEngine.search(message, 5);
    const decision = decisionEngine.decideMode(internalResults);
    const { mode, confidence } = decision;

    let externalResults: ExternalKnowledgeResult[] = [];
    if (mode === 'hybrid' || mode === 'external') {
      externalResults = await externalEngine.search(message, 3);
    }

    const sources = [
      ...internalResults.map(r => ({ type: 'internal', title: r.title, url: r.sourceUrl || null })),
      ...externalResults.map(r => ({ type: r.sourceType, title: r.title, url: r.url }))
    ];

    // Send initial metadata
    yield {
      type: 'metadata',
      data: { mode, confidence, sources }
    };

    const dalilKeywords = ['dalil', 'ayat', 'alquran', 'al-quran', 'hadis', 'hadist', 'sumber', 'teks arab', 'nas '];
    const includeDalil = dalilKeywords.some(kw => message.toLowerCase().includes(kw));

    const streamObj = await llmEngine.buildAndStreamPrompt(message, mode, internalResults, externalResults, includeDalil);

    for await (const chunk of streamObj) {
      const content = chunk.choices[0]?.delta?.content || '';
      if (content) {
        yield { type: 'chunk', data: content };
      }
    }
  }
}

export const generalAgent = new GeneralAgent();
