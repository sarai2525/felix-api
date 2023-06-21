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
    reservations: {
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
    reservations: {
      create: [],
    },
  },
];

export const studio = async () => {
  records.forEach(async record => {
    const { id, name, plans, reservations } = record;
    await prisma.studio.upsert({
      where: {
        id,
      },
      create: {
        id,
        name,
        status: 'AVAILABLE',
        plans,
        reservations,
      },
      update: {
        id,
        name,
        status: 'AVAILABLE',
        plans,
        reservations,
      },
    });
  });
};
