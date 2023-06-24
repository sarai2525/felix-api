import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const records = [
  {
    id: 1,
    name: 'hall',
    status: 'AVAILABLE',
    plans: {
      create: [],
    },
  },
  {
    id: 2,
    name: 'studio',
    status: 'AVAILABLE',
    plans: {
      create: [],
    },
  },
];

export const studio = async () => {
  records.forEach(async record => {
    const { id, name, plans } = record;
    await prisma.studio.upsert({
      where: {
        id,
      },
      create: {
        id,
        name,
        status: 'AVAILABLE',
        plans,
      },
      update: {
        id,
        name,
        status: 'AVAILABLE',
        plans,
      },
    });
  });
};
