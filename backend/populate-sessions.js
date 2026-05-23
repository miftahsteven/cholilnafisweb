const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const logs = await prisma.$queryRaw`SELECT DISTINCT "sessionId" FROM chat_logs WHERE "sessionId" IS NOT NULL`;
  console.log(`Found ${logs.length} unique session IDs`);
  let created = 0;
  for (const log of logs) {
    const sessionId = log.sessionId;
    const exists = await prisma.$queryRaw`SELECT id FROM chat_sessions WHERE id = ${sessionId}`;
    if (exists.length === 0) {
      await prisma.$queryRaw`INSERT INTO chat_sessions (id, "createdAt", "updatedAt", channel, "activeAgent") VALUES (${sessionId}, NOW(), NOW(), 'web', 'general')`;
      created++;
    }
  }
  console.log(`Created ${created} sessions`);
}

main().catch(console.error).finally(() => prisma.$disconnect());
