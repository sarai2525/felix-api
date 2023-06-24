import { PrismaClient } from '@prisma/client';
import { consola } from 'consola';
import { plan } from '@/prisma/seed/plan';
import { studio } from '@/prisma/seed/studio';

const prisma = new PrismaClient();

async function main() {
  consola.info('start seeding');
  await studio();
  await plan();
}

main()
  .catch(error => {
    consola.error(error);
  })
  // eslint-disable-next-line unicorn/prefer-top-level-await
  .finally(async () => {
    consola.info('quit seeding');
    await prisma.$disconnect();
  });
