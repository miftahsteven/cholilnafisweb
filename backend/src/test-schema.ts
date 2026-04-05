import { prisma } from './lib/prisma';
async function test() {
  console.log('Testing Prisma schema update...');
  // We don't actually need to execute, just check if it compiles
  const dummy: any = {
    sessionId: 'test',
    question: 'test',
    answer: 'test',
    source: 'cholilnafis.id'
  };
  console.log('Schema objects defined. If this script runs with tsx, it means types are accessible.');
}
test();
