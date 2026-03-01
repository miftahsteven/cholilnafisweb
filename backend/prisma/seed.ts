import bcrypt from 'bcryptjs';
import { prisma } from '../src/lib/prisma';

async function main() {
  console.log('🌱  Seeding admin user...');

  const passwordHash = await bcrypt.hash('B47054ii!!#$', 12);

  const admin = await prisma.user.upsert({
    where: { username: 'admin' },
    update: {
      passwordHash,
      role: 'SUPER_ADMIN',
    },
    create: {
      name: 'Administrator',
      username: 'admin',
      email: 'admin@cholilnafis.id',
      passwordHash,
      role: 'SUPER_ADMIN',
    },
  });

  console.log(`✅  Admin user seeded: ${admin.username} (${admin.email})`);
}

main()
  .catch((e) => {
    console.error('❌  Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
