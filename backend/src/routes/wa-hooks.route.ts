import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { kiAiService } from '../modules/ki-ai/ki-ai.service';

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
    
    // RULE: cek payload.body diawali "tanya ki"
    if (!text.toLowerCase().startsWith('tanya ki')) {
      return reply.send({ status: 'ignored', reason: 'not a ki query' });
    }

    // Respond immediately to WAHA to avoid timeouts
    reply.send({ status: 'received' });

    // RULE: Jalankan Routes webhoos di background
    setImmediate(async () => {
      try {
        const question = text.substring('tanya ki'.length).trim();
        if (!question) return;

        // RULE: Jawaban berikan jeda 5 detik agar tidak terlihat seperti bot
        await new Promise(resolve => setTimeout(resolve, 5000));

        const chatId = payload.from; // format: "628xxx@c.us"
        
        // Use the common ki.ai system logic
        const answer = await kiAiService.askFullAnswer(
          question, 
          `wa-session-${chatId}`, 
          chatId,
          payload.pushName || 'WhatsApp User'
        );

        // RULE: Gunakan Api send message WAHA
        const response = await fetch(`${WAHA_URL}/api/sendText`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Api-Key': WAHA_API_KEY
          },
          body: JSON.stringify({
            chatId: chatId,
            text: answer,
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
