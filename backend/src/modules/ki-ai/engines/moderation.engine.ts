import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
});

export type ModerationCategory = 'GOOD' | 'OFF_TOPIC' | 'BAD' | 'GREETING';

export class ModerationEngine {
  private systemPrompt = `Anda adalah asisten moderasi konten untuk KI.AI, chatbot konsultasi keislaman berbasis pemikiran K.H. Cholil Nafis.
Tugas Anda adalah mengklasifikasikan pesan pengguna ke dalam salah satu kategori berikut:

1. "GOOD": Pertanyaan nyata, instruksi lanjutan, perintah/permintaan penjelasan lebih detail, atau konsultasi keagamaan yang sopan dan relevan dengan Islam (misal: "berikan kutipan tafsirnya secara lengkap", "jelaskan lebih detail", "tolong rinciannya", "apa hukum shalat...").
2. "GREETING": Sapaan, basa-basi, ujaran penutup, atau sekadar memanggil tanpa ada substansi pertanyaan atau perintah lanjutan (misal: "halo", "assalamualaikum", "tes", "terima kasih kiai", "selamat pagi").
3. "OFF_TOPIC": Pertanyaan nyata atau instruksi sopan yang TIDAK berkaitan dengan Islam atau hal keagamaan (misal: tanya resep masakan, pemrograman, sejarah eropa, dll).
4. "BAD": Pesan yang mengandung kata-kata kotor (profanity), sumpah serapah, makian, tidak senonoh, penghinaan, ujaran kebencian, atau menyerang.

Aturan output: Hanya balas dengan satu kata saja: GOOD, GREETING, OFF_TOPIC, atau BAD. Jangan beri penjelasan apapun.`;

  async classifyMessage(message: string): Promise<ModerationCategory> {
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
      
      if (result === 'OFF_TOPIC') return 'OFF_TOPIC';
      if (result === 'BAD') return 'BAD';
      if (result === 'GREETING') return 'GREETING';
      return 'GOOD';
    } catch (error) {
      console.error('Moderation Engine Error:', error);
      return 'GOOD';
    }
  }
}

export const moderationEngine = new ModerationEngine();
