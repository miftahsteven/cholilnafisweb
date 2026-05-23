const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  try {
    let session = await prisma.chatSession.findUnique({ where: { id: 'test-12345' } });
    if (!session) {
      session = await prisma.chatSession.create({
        data: {
          id: 'test-12345',
          channel: 'web',
          activeAgent: 'maktabah_syamilah'
        }
      });
      console.log('Session created:', session.id);
    }

    const log = await prisma.chatLog.create({
      data: {
        sessionId: session.id,
        channel: 'web',
        agent: 'maktabah_syamilah',
        question: 'Testing 123',
        answer: '',
        mode: 'pending'
      }
    });
    console.log('Log created:', log.id);
  } catch (e) {
    console.error(e);
  } finally {
    await prisma.$disconnect();
  }
}
main();
