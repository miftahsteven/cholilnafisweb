import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { kiAiService } from '../modules/ki-ai/ki-ai.service';
import { moderationEngine } from '../modules/ki-ai/engines/moderation.engine';

/**
 * WAHA Webhook Route for KI.AI Integration
 * 
 * Server: https://wa.mscode.id/
 * API Key: 320f901cb17b48559ed752797257255c
 * Session: default
 */

const WAHA_URL = process.env.WAHA_URL || 'https://wa.mscode.id';
const WAHA_API_KEY = process.env.WAHA_API_KEY || '320f901cb17b48559ed752797257255c';

export async function waHooksRoutes(fastify: FastifyInstance) {
  fastify.post('/', async (request: FastifyRequest, reply: FastifyReply) => {
    const body = request.body as any;

    // RULE: proses hanya event === "message"
    if (body.event !== 'message') {
      return reply.send({ status: 'ignored', reason: 'not a message event' });
    }

    const payload = body.payload;

    // RULE: abaikan pesan dari bot sendiri
    if (payload.fromMe === true) {
      return reply.send({ status: 'ignored', reason: 'from me' });
    }

    const text = payload.body || '';
    const lowerText = text.toLowerCase().trim();
    
    // Check triggers
    const isTanyaKi = lowerText.startsWith('tanya ki');
    const isSalam = lowerText.startsWith("assalamu'alaikum") || lowerText.startsWith("assalamualaikum");
    const isGreeting = lowerText.startsWith('hallo') || 
                       lowerText.startsWith('halo') || 
                       lowerText.startsWith('selamat pagi') || 
                       lowerText.startsWith('selamat siang') || 
                       lowerText.startsWith('selamat sore') || 
                       lowerText.startsWith('selamat malam') ||
                       lowerText.startsWith('hai') ||
                       lowerText.startsWith('hi');

    // RULE: selain diawali "Tanya ki", dan 2 model sapaan diatas, tidak perlu di simpan dan tidak perlu dijawab.
    if (!isTanyaKi && !isSalam && !isGreeting) {
      return reply.send({ status: 'ignored', reason: 'not a valid trigger' });
    }

    // Respond immediately to WAHA to avoid timeouts
    reply.send({ status: 'received' });

    // RULE: Jalankan Routes webhoos di background
    setImmediate(async () => {
      try {
        const chatId = payload.from; // format: "628xxx@c.us"
        
        // RULE: Jawaban berikan jeda 5 detik agar tidak terlihat seperti bot
        await new Promise(resolve => setTimeout(resolve, 5000));

        let finalResponse = '';

        const category = await moderationEngine.classifyMessage(text);

        // RULE: jika ada pertanyaan atau sapaan yang mengandung unsur tidak sopan...
        if (category === 'BAD') {
          finalResponse = "Mohon maaf sebelumnya, kami ingin mengingatkan bahwa seluruh riwayat percakapan Anda tersimpan dalam sistem kami. Kami sangat menghargai niat baik Anda untuk berkonsultasi, namun mohon untuk tetap menjaga adab, sopan santun, dan etika dalam berkomunikasi di majelis ilmu digital ini. Mari kita gunakan ruang ini dengan cara yang elegan dan penuh keberkahan. Terima kasih.";
        } 
        else if (isSalam) {
          // RULE: tambahkan lagi jika dimulai assalamu'alaikum / assalamualaikum
          const salamReplies = [
            "Wa'alaikum salam Wr. Wb. Masya Allah, sapaan yang membawa kesejukan! Senang sekali bisa bersua dengan Anda di sini. Bagaimana kabarnya? Adakah kemusykilan agama yang sedang mengganjal di hati atau pikiran? Silakan sampaikan saja dengan diawali 'Tanya ki', insya Allah asisten kiai di sini siap membantu mengurainya dengan santai tapi tetap beradab.",
            "Wa'alaikum salam Wr. Wb. Ahlan wa sahlan! Wah, sapaannya mantap sekali. Daripada kita cuma berbalas salam, bagaimana kalau kita lanjut dengan diskusi ilmu? Ada yang ingin ditanyakan seputar fikih atau kehidupan beragama? Monggo, silakan tanya dengan diawali 'Tanya ki', jangan sungkan-sungkan ya!"
          ];
          finalResponse = salamReplies[Math.floor(Math.random() * salamReplies.length)];
        }
        else if (isGreeting) {
          // RULE: tambahkan jika diawali dengan / hallo / selamat {pagi/siang/sore/malam} / sapaan lain
          const greetingReplies = [
            "Halo juga! Senang sekali Anda mampir ke sini. Daripada kita cuma 'halo-halo' saja, yuk kita manfaatkan waktu untuk belajar agama. Silakan ajukan pertanyaan Anda dengan diawali kata 'Tanya ki' ya.",
            "Selamat juga untuk Anda! Masya Allah, semangat sekali ya hari ini. Ayo, mumpung lagi semangat, silakan ajukan pertanyaan atau konsultasi seputar keislaman dengan diawali 'Tanya ki'. Saya sudah siap dengan referensinya nih!"
          ];
          finalResponse = greetingReplies[Math.floor(Math.random() * greetingReplies.length)];
        }
        else if (isTanyaKi) {
          const question = text.substring('tanya ki'.length).trim();
          if (!question) return;

          // Use the common ki.ai system logic
          finalResponse = await kiAiService.askFullAnswer(
            question, 
            `wa-session-${chatId}`, 
            chatId,
            payload.pushName || 'WhatsApp User'
          );
        }

        if (!finalResponse) return;

        // RULE: Gunakan Api send message WAHA
        const response = await fetch(`${WAHA_URL}/api/sendText`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Api-Key': WAHA_API_KEY
          },
          body: JSON.stringify({
            chatId: chatId,
            text: finalResponse,
            session: 'default',
            reply_to: 'ki.ai',
            linkPreview: true,
            linkPreviewHighQuality: false
          })
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.error(`WAHA API Error: ${response.status} - ${errorText}`);
        }

      } catch (error) {
        console.error('WA Webhook background processing error:', error);
      }
    });
  });
}
