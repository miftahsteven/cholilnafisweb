import { prisma } from '../lib/prisma';

export const chatbotAdminService = {
  /**
   * Fetch questions from local and remote (mcnid.net) backends
   */
  async getAggregatedQuestions(adminToken: string) {
    // 1. Fetch local questions
    const localQuestions = (await prisma.chatLog.findMany({
      orderBy: { createdAt: 'desc' },
      include: { feedbacks: true },
      take: 100, // Reasonable limit
    })).map((q: any) => ({
      ...q,
      source: 'cholilnafis.id', // Tag local results in-code
    }));

    // 2. Fetch remote questions from mcnid.net (localhost:4001)
    let remoteQuestions: any[] = [];
    try {
      const response = await fetch('http://localhost:4001/api/admin/ki-ai/questions', {
        headers: {
          'Authorization': `Bearer ${adminToken}`,
          'User-Agent': 'CholilWeb-Backend/1.0',
          'Origin': 'http://localhost:4000', // Bypass origin check
        },
      });

      if (response.ok) {
        const json: any = await response.json();
        remoteQuestions = (json.data || []).map((q: any) => ({
          ...q,
          source: q.source || 'mcnid.net', // Default source if missing
        }));
      } else {
        console.warn('[WARN] Failed to fetch remote questions:', response.status, response.statusText);
      }
    } catch (err: any) {
      console.error('[ERROR] Error fetching remote questions:', err.message);
      // We don't fail the whole request if remote is down
    }

    // 3. Merge and sort
    const aggregated = [...localQuestions, ...remoteQuestions].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    return aggregated;
  },
};
