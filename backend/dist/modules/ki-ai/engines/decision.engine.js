"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decisionEngine = exports.DecisionEngine = void 0;
class DecisionEngine {
    /**
     * Mengambil keputusan berdasarkan skor tertinggi dari pencarian internal.
     * PRD Rule:
     * > 0.75    -> Internal only
     * 0.45-0.75 -> Internal + External (Hybrid)
     * < 0.45    -> External only
     * No data   -> No answer (none)
     */
    decideMode(internalResults) {
        if (!internalResults || internalResults.length === 0) {
            return { mode: 'external', confidence: 0 };
        }
        // Ambil score tertinggi
        const maxScore = Math.max(...internalResults.map(r => r.score));
        let mode = 'none';
        if (maxScore > 0.40) {
            mode = 'internal';
        }
        else if (maxScore >= 0.10 && maxScore <= 0.40) {
            mode = 'hybrid';
        }
        else {
            mode = 'external'; // Skors sangat rendah atau nol, delegasikan ke external
        }
        return {
            mode,
            confidence: maxScore,
        };
    }
}
exports.DecisionEngine = DecisionEngine;
exports.decisionEngine = new DecisionEngine();
