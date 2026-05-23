import { FastifyRequest, FastifyReply } from 'fastify';
import { kiAiService } from './ki-ai.service';
import { moderationEngine } from './engines/moderation.engine';
import { agentRouter } from './core/agent-router.service';
import { AgentRouteInput } from './core/types';
import { prisma } from '../../lib/prisma';
import { z } from 'zod';

const ChatRequestSchema = z.object({
  message: z.string().min(1),
  session_id: z.string(),
  agent: z.enum(['general', 'maktabah_syamilah']).optional(),
  user_id: z.string().optional(),
  userId: z.string().optional(), // Fallback for camelCase
  user_name: z.string().optional(),
  userName: z.string().optional(),
  user_email: z.string().optional(),
  userEmail: z.string().optional(),
});

export class KiAiController {
  private async calculateUsedQuota(userId: string): Promise<number> {
    return kiAiService.calculateUsedQuota(userId);
  }


  async handleChat(request: FastifyRequest, reply: FastifyReply) {
    try {
      const parsed = ChatRequestSchema.safeParse(request.body);
      if (!parsed.success) {
        return reply.status(400).send({ error: parsed.error.errors });
      }

      const {
        message,
        session_id,
        agent,
        user_id,
        userId,
        user_name,
        userName,
        user_email,
        userEmail
      } = parsed.data;

      const final_user_id = user_id || userId;
      const final_user_name = user_name || userName;
      const final_user_email = user_email || userEmail;
      const final_agent = agent || 'general';

      // Ensure session exists or create it
      let session = await prisma.chatSession.findUnique({ where: { id: session_id } });
      if (!session) {
        session = await prisma.chatSession.create({
          data: {
            id: session_id,
            userId: final_user_id || null,
            channel: 'web',
            activeAgent: final_agent
          }
        });
      } else if (session.activeAgent !== final_agent) {
        session = await prisma.chatSession.update({
          where: { id: session_id },
          data: { activeAgent: final_agent }
        });
      }

      // FORCED LOGGING: Create initial log for audit
      const initialLog = await prisma.chatLog.create({
        data: {
          sessionId: session.id,
          channel: 'web',
          agent: final_agent,
          userId: final_user_id || null,
          userName: final_user_name || null,
          userEmail: final_user_email || null,
          question: message,
          answer: '', // Will be updated
          mode: 'pending'
        }
      });

      // 0. Check if user is blocked
      if (final_user_id) {
        const isBlocked = await prisma.blockedKiAiUser.findUnique({ where: { userId: final_user_id } });
        if (isBlocked) {
          const blockMsg = "Mohon maaf, akun Anda telah diblokir secara permanen dari layanan KI.AI karena pelanggaran pedoman komunitas sebelumnya. Anda tidak dapat melanjutkan konsultasi.";

          await prisma.chatLog.update({
            where: { id: initialLog.id },
            data: { answer: blockMsg, mode: 'blocked' }
          });

          reply.raw.setHeader('Content-Type', 'text/event-stream');
          reply.raw.setHeader('Cache-Control', 'no-cache');
          reply.raw.setHeader('Connection', 'keep-alive');
          reply.raw.write(`data: ${JSON.stringify({ text: blockMsg })}\n\n`);
          reply.raw.write('data: [DONE]\n\n');
          reply.raw.end();
          return;
        }
      }

      // 1. Content Moderation
      const category = await moderationEngine.classifyMessage(message);

      if (category === 'BAD') {
        const blockText = "Pertanyaan Anda mengandung konten yang tidak pantas, menyinggung, atau melanggar pedoman kami. Demi menjaga kesantunan dan kehormatan majelis ilmu ini, akun Anda telah kami BLOKIR PERMANEN. Harap gunakan bahasa yang baik dan sopan di lain kesempatan.";

        await prisma.chatLog.update({
          where: { id: initialLog.id },
          data: { answer: blockText, mode: 'blocked' }
        });

        if (final_user_id) {
          await prisma.blockedKiAiUser.upsert({
            where: { userId: final_user_id },
            update: {
              userName: final_user_name || null,
              userEmail: final_user_email || null,
              reason: `Automatic block for: "${message.substring(0, 100)}"`
            },
            create: {
              userId: final_user_id,
              userName: final_user_name || null,
              userEmail: final_user_email || null,
              reason: `Automatic block for: "${message.substring(0, 100)}"`
            },
          });
        }

        reply.raw.setHeader('Content-Type', 'text/event-stream');
        reply.raw.setHeader('Cache-Control', 'no-cache');
        reply.raw.setHeader('Connection', 'keep-alive');
        reply.raw.write(`data: ${JSON.stringify({ text: blockText })}\n\n`);
        reply.raw.write('data: [DONE]\n\n');
        reply.raw.end();
        return;
      }

      if (category === 'OFF_TOPIC') {
        const friendlyMsg = `Assalamu'alaikum Wr. Wb. Terima kasih atas pertanyaannya yang cukup menarik. Namun, perlu kami sampaikan bahwa layanan KI.AI ini secara khusus difokuskan untuk konsultasi seputar dunia keislaman dan pemikiran kami.\n\nSayang sekali jika kuota harian Anda yang terbatas (5 pertanyaan) terpakai untuk hal di luar materi keislaman. Mari kita manfaatkan kesempatan ini untuk memperdalam ilmu agama. Silakan ajukan pertanyaan seputar hukum Islam, ibadah, atau kehidupan beragama lainnya ya. Barakallah.`;

        await prisma.chatLog.update({
          where: { id: initialLog.id },
          data: { answer: friendlyMsg, mode: 'off-topic', confidence: 1.0 }
        });

        reply.raw.setHeader('Content-Type', 'text/event-stream');
        reply.raw.setHeader('Cache-Control', 'no-cache');
        reply.raw.setHeader('Connection', 'keep-alive');
        reply.raw.write(`data: ${JSON.stringify({ text: friendlyMsg })}\n\n`);
        reply.raw.write('data: [DONE]\n\n');
        reply.raw.end();
        return;
      }


      if (category === 'GREETING') {
        const greetings = [
          "Senang sekali disapa. Ada kemusykilan (masalah) agama apa nih yang bisa kita diskusikan hari ini?",
          "Ayo, jangan sungkan-sungkan, asisten kiai di sini tidak galak kok. Ada pertanyaan?",
          "Ahlan wa Sahlan! MasyaAllah, sapaan yang membawa berkah. Daripada diam-diaman, mending kita bahas hukum Islam. Silakan!",
          "Wah, kelihatannya lagi semangat ya? Mari kita tumpahkan semangatnya ke dalam pertanyaan keislaman.",
          "Halo! Sapaannya sudah sampai ke meja saya. Sekarang saya tunggu pertanyaan Anda. Tenang, konsultasi di sini gratis, bayarnya pakai doa saja.",
          "Silakan, kalau ada yang ingin ditanyakan soal agama. Pintu konsultasi selalu terbuka.",
          "Salam hangat! Senang disapa Anda. Tapi saya lebih senang lagi kalau ditanya soal ilmu. Ada yang sedang dipikirkan soal fikih?",
          "MasyaAllah, indahnya ukhuwah. Monggo, silakan ajukan pertanyaan Anda. Saya sudah siap dengan referensinya nih.",
          "Halo! Sapaannya sudah diterima dengan baik. Yuk, daripada cuma 'Halo', kita cari pahala dengan belajar agama. Apa pertanyaannya?",
          "Ada masalah ibadah atau muamalah yang ingin kita urai benang kusutnya?",
          "Berkunjung tanpa bertanya ibarat makan sayur tanpa garam. Kurang mantap! Silakan, apa yang ingin ditanyakan?",
          "Halo, Sahabat! Senang sekali bisa berjumpa lewat chat ini. Jangan malu-malu, sampaikan saja kebingungan Anda soal agama.",
          "Yuk, semoga menjadi amal jariyah. Ayo, ada yang ingin dikonsultasikan seputar keislaman?",
          "Salam! Wah, sapaannya singkat padat. Semoga pertanyaannya nanti lebih berbobot lagi ya. Hehe. Monggo, silakan tanya.",
          "Terima kasih sudah menyapa. Yuk, manfaatkan kesempatan hari ini untuk hal yang bermanfaat. Ada pertanyaan apa?"
        ];
        
        const randomMsg = greetings[Math.floor(Math.random() * greetings.length)];
        const lowerMessage = message.toLowerCase();
        const hasSalam = lowerMessage.includes("assalamu'alaikum") || lowerMessage.includes("assalamualaikum");
        
        const friendlyMsg = hasSalam ? `Wa'alaikum salam, ${randomMsg}` : randomMsg;
        
        await prisma.chatLog.update({
          where: { id: initialLog.id },
          data: { answer: friendlyMsg, mode: 'greeting', confidence: 1.0 }
        });

        reply.raw.setHeader('Content-Type', 'text/event-stream');
        reply.raw.setHeader('Cache-Control', 'no-cache');
        reply.raw.setHeader('Connection', 'keep-alive');
        reply.raw.write(`data: ${JSON.stringify({ text: friendlyMsg })}\n\n`);
        reply.raw.write('data: [DONE]\n\n');
        reply.raw.end();
        return;
      }

      // 2. Global Daily Rate limit per User
      if (final_user_id) {
        const dailyCount = await this.calculateUsedQuota(final_user_id);

        if (dailyCount >= 5) {
          const limitMsg = "Anda telah mencapai batas maksimal 5 pertanyaan untuk hari ini. Silakan kembali besok atau hubungi redaksi@mcnid.net.";

          await prisma.chatLog.update({
            where: { id: initialLog.id },
            data: { answer: limitMsg, mode: 'rate-limited' }
          });

          reply.raw.setHeader('Content-Type', 'text/event-stream');
          reply.raw.setHeader('Cache-Control', 'no-cache');
          reply.raw.setHeader('Connection', 'keep-alive');
          reply.raw.write(`data: ${JSON.stringify({ text: limitMsg })}\n\n`);
          reply.raw.write('data: [DONE]\n\n');
          reply.raw.end();
          return;
        }
      }

      // Use Agent Router
      const agentInput: AgentRouteInput = {
        message,
        agent: final_agent as any,
        channel: 'web',
        sessionId: session_id,
        userId: final_user_id,
        userName: final_user_name,
        userEmail: final_user_email
      };

      const stream = agentRouter.streamQuestion(agentInput);

      reply.raw.setHeader('Content-Type', 'text/event-stream');
      reply.raw.setHeader('Cache-Control', 'no-cache');
      reply.raw.setHeader('Connection', 'keep-alive');

      let fullAnswer = '';
      let metadataReceived: any = null;

      for await (const chunk of stream) {
        if (chunk.type === 'metadata') {
          metadataReceived = chunk.data;
          
          await prisma.chatLog.update({
            where: { id: initialLog.id },
            data: { mode: metadataReceived.mode, confidence: metadataReceived.confidence }
          });
          
          if (metadataReceived.sources && metadataReceived.sources.length > 0) {
            await prisma.chatSource.createMany({
              data: metadataReceived.sources.map((s: any) => ({
                chatId: initialLog.id,
                sourceType: s.type,
                sourceUrl: s.url || null,
                title: s.title || null,
                author: s.author || null,
                chapter: s.chapter || null,
                page: s.page || null,
                volume: s.volume || null,
                excerpt: s.excerpt || null,
                referenceId: s.referenceId || null,
              })),
            });
          }
        } else if (chunk.type === 'chunk') {
          const content = chunk.data;
          fullAnswer += content;
          reply.raw.write(`data: ${JSON.stringify({ text: content })}\n\n`);
        }
      }

      // Metadata at the end
      if (metadataReceived) {
        reply.raw.write(`data: ${JSON.stringify({
          metadata: {
            mode: metadataReceived.mode,
            sources: metadataReceived.sources,
            confidence: metadataReceived.confidence,
            chat_id: initialLog.id
          }
        })}\n\n`);
      }

      reply.raw.write('data: [DONE]\n\n');
      reply.raw.end();

      // Final db update
      await prisma.chatLog.update({
        where: { id: initialLog.id },
        data: { answer: fullAnswer }
      });

    } catch (error: any) {
      console.error('KI.AI Chat Error:', error);
      if (!reply.raw.headersSent) {
        return reply.status(500).send({ error: 'Internal Server Error', details: error.message });
      } else {
        reply.raw.end();
      }
    }
  }

  async getSessions(request: FastifyRequest, reply: FastifyReply) {
    try {
      const query = request.query as { user_id?: string, userId?: string };
      const final_user_id = query.user_id || query.userId;

      if (!final_user_id || final_user_id === 'undefined') {
        return reply.status(400).send({ error: 'user_id is required' });
      }

      const dailyCount = await this.calculateUsedQuota(final_user_id);

      const logs = await prisma.chatLog.findMany({
        where: { userId: final_user_id },
        orderBy: { createdAt: 'desc' },
        distinct: ['sessionId'],
        select: {
          sessionId: true,
          question: true,
          createdAt: true
        },
        take: 10
      });

      const isBlocked = await prisma.blockedKiAiUser.findUnique({
        where: { userId: final_user_id }
      });

      return reply.send({ data: logs, dailyCount, isBlocked: !!isBlocked });
    } catch (err: any) {
      console.error('getSessions error:', err);
      return reply.status(500).send({ error: err.message });
    }
  }

  async getSessionDetails(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { sessionId } = request.params as { sessionId: string };
      if (!sessionId) return reply.status(400).send({ error: 'sessionId is required' });

      const messages = await prisma.chatLog.findMany({
        where: { sessionId },
        include: {
          sources: true,
          feedbacks: true
        },
        orderBy: { createdAt: 'asc' }
      });

      return reply.send({ data: messages });
    } catch (err: any) {
      console.error('getSessionDetails error:', err);
      return reply.status(500).send({ error: err.message });
    }
  }

  async provideFeedback(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { chatId, isHelpful } = request.body as { chatId: string, isHelpful: boolean };
      if (!chatId) return reply.status(400).send({ error: 'chatId is required' });

      await prisma.feedback.upsert({
        where: { chatId },
        update: { isHelpful },
        create: { chatId, isHelpful }
      });

      return reply.send({ message: 'Terima kasih atas masukan Anda!' });
    } catch (err: any) {
      console.error('provideFeedback error:', err);
      return reply.status(500).send({ error: err.message });
    }
  }

  async getAllQuestions(request: FastifyRequest, reply: FastifyReply) {
    try {
      const logs = await prisma.chatLog.findMany({
        orderBy: { createdAt: 'desc' },
        include: { feedbacks: true }
      });
      const blockedUsers = await prisma.blockedKiAiUser.findMany();
      return reply.send({ data: logs, blockedUsers });
    } catch (err: any) {
      console.error('getAllQuestions error:', err);
      return reply.status(500).send({ error: err.message });
    }
  }

  async deleteQuestion(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { id } = request.params as { id: string };
      await prisma.chatLog.delete({ where: { id } });
      return reply.send({ message: 'Pertanyaan berhasil dihapus' });
    } catch (err: any) {
      console.error('deleteQuestion error:', err);
      return reply.status(500).send({ error: err.message });
    }
  }

  async resetUserQuestions(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { userId } = request.params as { userId: string };
      const startOfToday = new Date();
      startOfToday.setHours(0, 0, 0, 0);

      const deleted = await prisma.chatLog.deleteMany({
        where: {
          userId,
          createdAt: { gte: startOfToday }
        }
      });

      return reply.send({ message: `Berhasil mereset limit. ${deleted.count} pertanyaan hari ini dihapus.` });
    } catch (err: any) {
      console.error('resetUserQuestions error:', err);
      return reply.status(500).send({ error: err.message });
    }
  }

  async wipeUserQuestions(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { userId } = request.params as { userId: string };
      await prisma.chatLog.deleteMany({ where: { userId } });
      return reply.send({ message: 'Semua riwayat pertanyaan user berhasil dihapus' });
    } catch (err: any) {
      console.error('wipeUserQuestions error:', err);
      return reply.status(500).send({ error: err.message });
    }
  }

  async unblockUser(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { userId } = request.params as { userId: string };
      await prisma.blockedKiAiUser.delete({ where: { userId } });
      return reply.send({ message: 'Blokir akun berhasil dibuka.' });
    } catch (err: any) {
      console.error('unblockUser error:', err);
      return reply.status(500).send({ error: err.message });
    }
  }
}

export const kiAiController = new KiAiController();
