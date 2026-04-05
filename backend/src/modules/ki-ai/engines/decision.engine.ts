import { InternalKnowledgeResult } from './knowledge.engine';

export type ChatMode = 'internal' | 'hybrid' | 'external' | 'none';

export interface DecisionResult {
  mode: ChatMode;
  confidence: number;
}

export class DecisionEngine {
  /**
   * Mengambil keputusan berdasarkan skor tertinggi dari pencarian internal.
   * PRD Rule:
   * > 0.75    -> Internal only
   * 0.45-0.75 -> Internal + External (Hybrid)
   * < 0.45    -> External only
   * No data   -> No answer (none)
   */
  decideMode(internalResults: InternalKnowledgeResult[]): DecisionResult {
    if (!internalResults || internalResults.length === 0) {
      return { mode: 'external', confidence: 0 };
    }

    // Ambil score tertinggi
    const maxScore = Math.max(...internalResults.map(r => r.score));

    let mode: ChatMode = 'none';

    if (maxScore > 0.40) {
      mode = 'internal';
    } else if (maxScore >= 0.10 && maxScore <= 0.40) {
      mode = 'hybrid';
    } else {
      mode = 'external'; // Skors sangat rendah atau nol, delegasikan ke external
    }

    return {
      mode,
      confidence: maxScore,
    };
  }
}

export const decisionEngine = new DecisionEngine();
