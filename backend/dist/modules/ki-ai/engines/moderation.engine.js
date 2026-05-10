"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.moderationEngine = exports.ModerationEngine = void 0;
const openai_1 = __importDefault(require("openai"));
const openai = new openai_1.default({
    apiKey: process.env.OPENAI_API_KEY || '',
});
class ModerationEngine {
    systemPrompt = `Anda adalah asisten moderasi konten untuk KI.AI, chatbot konsultasi keislaman berbasis pemikiran K.H. Cholil Nafis.
Tugas Anda adalah mengklasifikasikan pesan pengguna ke dalam salah satu kategori berikut:

1. "GOOD": Pertanyaan nyata yang sopan, relevan dengan Islam, hukum syariah, atau konsultasi keagamaan. (Pilih ini HANYA jika ada substansi pertanyaan).
2. "GREETING": Sapaan, basa-basi, ujaran penutup, atau sekadar memanggil tanpa ada substansi pertanyaan yang jelas (misal: "halo", "assalamualaikum", "saya mau bertanya", "tes", "terima kasih kiai", "selamat pagi", kalimat iseng netral).
3. "OFF_TOPIC": Pertanyaan nyata yang SOPAN dan POSITIF, tetapi TIDAK berkaitan dengan Islam atau hal keagamaan (misal: tanya resep masakan, pemrograman, sejarah eropa, dll).
4. "BAD": Pesan yang mengandung kata-kata kotor (profanity), sumpah serapah, makian, tidak senonoh, penghinaan, ujaran kebencian, atau menyerang.

Aturan output: Hanya balas dengan satu kata saja: GOOD, GREETING, OFF_TOPIC, atau BAD. Jangan beri penjelasan apapun.`;
    async classifyMessage(message) {
        if (!process.env.OPENAI_API_KEY) {
            return 'GOOD'; // Default to good if no API key
        }
        try {
            const response = await openai.chat.completions.create({
                model: 'gpt-4o-mini',
                messages: [
                    { role: 'system', content: this.systemPrompt },
                    { role: 'user', content: message },
                ],
                temperature: 0,
                max_tokens: 10,
            });
            const result = response.choices[0]?.message?.content?.trim().toUpperCase();
            if (result === 'OFF_TOPIC')
                return 'OFF_TOPIC';
            if (result === 'BAD')
                return 'BAD';
            if (result === 'GREETING')
                return 'GREETING';
            return 'GOOD';
        }
        catch (error) {
            console.error('Moderation Engine Error:', error);
            return 'GOOD';
        }
    }
}
exports.ModerationEngine = ModerationEngine;
exports.moderationEngine = new ModerationEngine();
