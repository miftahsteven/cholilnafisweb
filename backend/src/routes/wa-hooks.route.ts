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

        // Pre-check for greetings/salam to use in prepending later
        const isSalam = lowerText.includes("assalamu'alaikum") ||
            lowerText.includes("assalamualaikum") ||
            lowerText.includes("assalamu’alaikum"); 
        const isGreeting = lowerText.includes('hallo') ||
            lowerText.includes('halo') ||
            lowerText.includes('hai') ||
            lowerText.includes('hi') ||
            lowerText.includes('selamat pagi') ||
            lowerText.includes('selamat siang') ||
            lowerText.includes('selamat sore') ||
            lowerText.includes('selamat malam');

        console.log(`[WA-HOOKS] Received message: text="${text}"`);

        // RULE: Abaikan jika pesan kosong
        if (!text.trim()) {
            return reply.send({ status: 'ignored', reason: 'empty message' });
        }

        // Respond immediately to WAHA to avoid timeouts
        reply.send({ status: 'received' });

        // RULE: Jalankan Routes webhoos di background
        setImmediate(async () => {
            try {
                const chatId = payload.from; // format: "628xxx@c.us"
                console.log(`[WA-HOOKS] Background processing started for ${chatId}`);

                // RULE: Jawaban berikan jeda 5 detik agar tidak terlihat seperti bot
                await new Promise(resolve => setTimeout(resolve, 5000));

                let finalResponse = '';

                const category = await moderationEngine.classifyMessage(text);
                console.log(`[WA-HOOKS] Moderation result: ${category}`);

                // RULE: jika ada pertanyaan atau sapaan yang mengandung unsur tidak sopan...
                if (category === 'BAD') {
                    finalResponse = "Mohon maaf sebelumnya, kami ingin mengingatkan bahwa seluruh riwayat percakapan Anda tersimpan dalam sistem kami. Kami sangat menghargai niat baik Anda untuk berkonsultasi, namun mohon untuk tetap menjaga adab, sopan santun, dan etika dalam berkomunikasi di majelis ilmu digital ini. Mari kita gunakan ruang ini dengan cara yang elegan dan penuh keberkahan. Terima kasih.";
                }
                else if (category === 'GOOD') {
                    // This is a substantial question
                    const question = text.trim();
                    const aiAnswer = await kiAiService.askFullAnswer(
                        question,
                        `wa-session-${chatId}`,
                        chatId,
                        payload.pushName || 'WhatsApp User'
                    );

                    // Prepend greeting if detected
                    let prefix = "";
                    if (isSalam) {
                        prefix = "Wa'alaikum salam Wr. Wb.\n\n";
                    } else if (isGreeting) {
                        prefix = "Halo! 👋\n\n";
                    }

                    finalResponse = prefix + aiAnswer;
                }
                else if (category === 'GREETING') {
                    const salamReplies = [
                        "Wa'alaikum salam Wr. Wb. Masya Allah, sapaan yang membawa kesejukan! Senang sekali bisa bersua dengan Anda di sini. Bagaimana kabarnya? Adakah kemusykilan agama yang sedang mengganjal di hati atau pikiran? Silakan sampaikan saja pertanyaan Anda, insya Allah asisten kiai di sini siap membantu mengurainya dengan santai tapi tetap beradab.",
                        "Wa'alaikum salam Wr. Wb. Ahlan wa sahlan! Wah, sapaannya mantap sekali. Daripada kita cuma berbalas salam, bagaimana kalau kita lanjut with diskusi ilmu? Ada yang ingin ditanyakan seputar fikih atau kehidupan beragama? Monggo, silakan tanya langsung saja, jangan sungkan-sungkan ya!"
                    ];
                    const greetingReplies = [
                        "Halo! Senang sekali Anda mampir ke sini. Daripada kita cuma 'halo-halo' saja, yuk kita manfaatkan waktu untuk belajar agama. Silakan ajukan pertanyaan Anda ya.",
                        "Selamat juga untuk Anda! Masya Allah, semangat sekali ya hari ini. Ayo, mumpung lagi semangat, silakan ajukan pertanyaan atau konsultasi seputar keislaman. Saya sudah siap dengan referensinya nih!",
                        "Halo! 👋 Senang sekali Anda berkunjung ke 'Kiai Digital' hari ini. Di sini kita bisa ngobrol santai tapi tetap bermakna tentang berbagai hal seputar keislaman. Daripada hanya berbalas sapaan, bagaimana kalau langsung saja ajukan pertanyaan atau kemusykilan yang ada di benak Anda? Saya akan bantu jawab sebaik mungkin. Monggo! 😊"
                    ];

                    if (isSalam) {
                        finalResponse = salamReplies[Math.floor(Math.random() * salamReplies.length)];
                    } else {
                        finalResponse = greetingReplies[Math.floor(Math.random() * greetingReplies.length)];
                    }
                }
                else if (category === 'OFF_TOPIC') {
                    finalResponse = "Terima kasih atas pertanyaannya. Namun, mohon maaf, saat ini saya khusus didesain untuk membantu menjawab konsultasi seputar keislaman, hukum syariah, dan pemikiran keagamaan. Untuk topik di luar hal tersebut, mungkin Anda bisa mencari referensi lain yang lebih sesuai. Mari kita diskusikan hal-hal yang berkaitan dengan keislaman di sini. 😊";
                }

                if (!finalResponse) {
                    console.log(`[WA-HOOKS] No response to send (empty)`);
                    return;
                }

                console.log(`[WA-HOOKS] Sending response to WAHA: "${finalResponse.substring(0, 50)}..."`);

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
                    console.error(`[WA-HOOKS] WAHA API Error: ${response.status} - ${errorText}`);
                } else {
                    console.log(`[WA-HOOKS] Response successfully sent to ${chatId}`);
                }

            } catch (error) {
                console.error('WA Webhook background processing error:', error);
            }
        });
    });
}
