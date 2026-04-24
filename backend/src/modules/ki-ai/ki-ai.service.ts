import { FastifyReply, FastifyRequest } from 'fastify';
import { knowledgeEngine, InternalKnowledgeResult } from './engines/knowledge.engine';
import { externalEngine, ExternalKnowledgeResult } from './engines/external.engine';
import { decisionEngine } from './engines/decision.engine';
import { llmEngine } from './engines/llm.engine';
import { moderationEngine } from './engines/moderation.engine';
import { prisma } from '../../lib/prisma';

export class KiAiService {
  async calculateUsedQuota(userId: string): Promise<number> {
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    const logsToday = await prisma.chatLog.findMany({
      where: {
        userId,
        createdAt: { gte: startOfToday }
      },
      select: { mode: true }
    });

    let questionCount = 0;
    let greetingCount = 0;

    for (const log of logsToday) {
      if (log.mode === 'greeting' || log.mode === 'off-topic') {
        greetingCount++;
      } else if (log.mode !== 'pending' && log.mode !== 'blocked' && log.mode !== 'rate-limited') {
        questionCount++;
      }
    }

    return questionCount + Math.floor(greetingCount / 3);
  }

  async askFullAnswer(
    message: string, 
    sessionId: string, 
    userId?: string, 
    userName?: string, 
    userEmail?: string
  ): Promise<string> {
    // 0. Initial Log
    const initialLog = await prisma.chatLog.create({
      data: {
        sessionId,
        userId: userId || null,
        userName: userName || null,
        userEmail: userEmail || null,
        question: message,
        answer: '',
        mode: 'pending'
      }
    });

    try {
      // 1. Check if user is blocked
      if (userId) {
        const isBlocked = await prisma.blockedKiAiUser.findUnique({ where: { userId } });
        if (isBlocked) {
          const blockMsg = "Mohon maaf, akun Anda telah diblokir secara permanen dari layanan KI.AI karena pelanggaran pedoman komunitas sebelumnya. Anda tidak dapat melanjutkan konsultasi.";
          await prisma.chatLog.update({ where: { id: initialLog.id }, data: { answer: blockMsg, mode: 'blocked' } });
          return blockMsg;
        }
      }

      // 2. Moderation
      const category = await moderationEngine.classifyMessage(message);

      if (category === 'BAD') {
        const blockText = "Pertanyaan Anda mengandung konten yang tidak pantas, menyinggung, atau melanggar pedoman kami. Demi menjaga kesantunan dan kehormatan majelis ilmu ini, akun Anda telah kami BLOKIR PERMANEN. Harap gunakan bahasa yang baik dan sopan di lain kesempatan.";
        await prisma.chatLog.update({ where: { id: initialLog.id }, data: { answer: blockText, mode: 'blocked' } });
        if (userId) {
          await prisma.blockedKiAiUser.upsert({
            where: { userId },
            update: { userName: userName || null, userEmail: userEmail || null, reason: `Automatic block for: "${message.substring(0, 100)}"` },
            create: { userId, userName: userName || null, userEmail: userEmail || null, reason: `Automatic block for: "${message.substring(0, 100)}"` },
          });
        }
        return blockText;
      }

      if (category === 'OFF_TOPIC') {
        const friendlyMsg = `Assalamu'alaikum Wr. Wb. Terima kasih atas pertanyaannya yang cukup menarik. Namun, perlu kami sampaikan bahwa layanan KI.AI ini secara khusus difokuskan untuk konsultasi seputar dunia keislaman dan pemikiran kami.\n\nSayang sekali jika kuota harian Anda yang terbatas (5 pertanyaan) terpakai untuk hal di luar materi keislaman. Mari kita manfaatkan kesempatan ini untuk memperdalam ilmu agama. Silakan ajukan pertanyaan seputar hukum Islam, ibadah, atau kehidupan beragama lainnya ya. Barakallah.`;
        await prisma.chatLog.update({ where: { id: initialLog.id }, data: { answer: friendlyMsg, mode: 'off-topic', confidence: 1.0 } });
        return friendlyMsg;
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
        await prisma.chatLog.update({ where: { id: initialLog.id }, data: { answer: friendlyMsg, mode: 'greeting', confidence: 1.0 } });
        return friendlyMsg;
      }

      // 3. Rate Limit
      if (userId) {
        const dailyCount = await this.calculateUsedQuota(userId);
        if (dailyCount >= 5) {
          const limitMsg = "Anda telah mencapai batas maksimal 5 pertanyaan untuk hari ini. Silakan kembali besok atau hubungi redaksi@mcnid.net.";
          await prisma.chatLog.update({ where: { id: initialLog.id }, data: { answer: limitMsg, mode: 'rate-limited' } });
          return limitMsg;
        }
      }

      // 4. Search & Decide
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

      await prisma.chatLog.update({ where: { id: initialLog.id }, data: { mode, confidence } });

      if (sources.length > 0) {
        await prisma.chatSource.createMany({
          data: sources.map(s => ({
            chatId: initialLog.id,
            sourceType: s.type,
            sourceUrl: s.url,
            title: s.title || null,
          })),
        });
      }

      // 5. Generate Answer
      const dalilKeywords = ['dalil', 'ayat', 'alquran', 'al-quran', 'hadis', 'hadist', 'sumber', 'teks arab', 'nas '];
      const includeDalil = dalilKeywords.some(kw => message.toLowerCase().includes(kw));

      const fullAnswer = await llmEngine.generate(message, mode, internalResults, externalResults, includeDalil);

      await prisma.chatLog.update({
        where: { id: initialLog.id },
        data: { answer: fullAnswer }
      });

      return fullAnswer;
    } catch (error) {
      console.error('KiAiService askFullAnswer error:', error);
      const errorMsg = "Mohon maaf, terjadi kesalahan saat memproses pertanyaan Anda. Silakan coba lagi nanti.";
      await prisma.chatLog.update({
        where: { id: initialLog.id },
        data: { answer: errorMsg, mode: 'error' }
      });
      return errorMsg;
    }
  }
}

export const kiAiService = new KiAiService();
