import { PrismaClient } from '@prisma/client';
import { consola } from 'consola';
import { plan } from './plan.js';
import { studio } from './studio.js';

const prisma = new PrismaClient();

async function main(): Promise<void> {
  consola.info('start seeding');
  await studio();
  await plan();
}

main()
  .catch((error) => {
    consola.error(error);
  })
  .finally(async (): Promise<void> => {
    consola.info('quit seeding');
    await prisma.$disconnect();
  });
