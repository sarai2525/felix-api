import { PrismaClient } from '@prisma/client';
import logger from '../../lib/logger.js';
import { plan } from './plan.js';
import { studio } from './studio.js';
import { user } from './user.js';

const prisma = new PrismaClient();

async function main(): Promise<void> {
  logger.info('Start seeding');
  await user();
  await studio();
  await plan();
}

main()
  .catch((error) => {
    logger.warn(error);
  })
  .finally(async (): Promise<void> => {
    logger.info('Quit seeding');
    await prisma.$disconnect();
  });
