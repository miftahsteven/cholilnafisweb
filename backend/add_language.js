const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function run() {
  try {
    await prisma.$executeRawUnsafe('ALTER TABLE "chat_logs" ADD COLUMN "language" TEXT');
    console.log("Column language added successfully.");
  } catch (err) {
    console.error("Error adding column:", err);
  } finally {
    await prisma.$disconnect();
  }
}
run();
