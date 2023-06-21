import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const records = [
  {
    id: 1,
    name: 'division one weekday morning',
    nameJa: '1区分平日午前',
    price: 16_500,
    studioId: 1,
    reservations: {
      create: [],
    },
    dateIn: '9:00',
    dateEnd: '12:00',
  },
  {
    id: 2,
    name: 'division one weekday afternoon',
    nameJa: '1区分平日午後',
    price: 21_000,
    studioId: 1,
    reservations: {
      create: [],
    },
    dateIn: '13:00',
    dateEnd: '16:30',
  },
  {
    id: 3,
    name: 'division one weekday night',
    nameJa: '1区分平日夜間',
    price: 26_500,
    studioId: 1,
    reservations: {
      create: [],
    },
    dateIn: '17:30',
    dateEnd: '21:30',
  },
  {
    id: 4,
    name: 'division one saturday morning',
    nameJa: '1区分土曜午前',
    price: 20_000,
    studioId: 1,
    reservations: {
      create: [],
    },
    dateIn: '9:00',
    dateEnd: '12:00',
  },
  {
    id: 5,
    name: 'division one saturday afternoon',
    nameJa: '1区分土曜午後',
    price: 26_500,
    studioId: 1,
    reservations: {
      create: [],
    },
    dateIn: '13:00',
    dateEnd: '16:30',
  },
  {
    id: 6,
    name: 'division one saturday night',
    nameJa: '1区分土曜夜間',
    price: 33_000,
    studioId: 1,
    reservations: {
      create: [],
    },
    dateIn: '17:30',
    dateEnd: '21:30',
  },
  {
    id: 7,
    name: 'division one holiday morning',
    nameJa: '1区分日曜祝日午前',
    price: 23_000,
    studioId: 1,
    reservations: {
      create: [],
    },
    dateIn: '09:00',
    dateEnd: '12:00',
  },
  {
    id: 8,
    name: 'division one holiday afternoon',
    nameJa: '1区分日曜祝日午後',
    price: 29_000,
    studioId: 1,
    reservations: {
      create: [],
    },
    dateIn: '13:00',
    dateEnd: '16:30',
  },
  {
    id: 9,
    name: 'division one holiday night',
    nameJa: '1区分日曜祝日夜間',
    price: 31_000,
    studioId: 1,
    reservations: {
      create: [],
    },
    dateIn: '17:30',
    dateEnd: '21:30',
  },
  {
    id: 10,
    name: 'division two weekday morning to afternoon',
    nameJa: '2区分平日午前〜午後',
    price: 32_500,
    studioId: 1,
    reservations: {
      create: [],
    },
    dateIn: '09:00',
    dateEnd: '16:30',
  },
  {
    id: 11,
    name: 'division two weekday afternoon to night',
    nameJa: '2区分平日午後〜夜間',
    price: 41_000,
    studioId: 1,
    reservations: {
      create: [],
    },
    dateIn: '16:30',
    dateEnd: '21:30',
  },
  {
    id: 12,
    name: 'division two saturday morning to afternoon',
    nameJa: '2区分土曜午前〜午後',
    price: 41_000,
    studioId: 1,
    reservations: {
      create: [],
    },
    dateIn: '09:00',
    dateEnd: '16:30',
  },
  {
    id: 13,
    name: 'division two saturday afternoon to night',
    nameJa: '2区分土曜午後〜夜間',
    price: 52_500,
    studioId: 1,
    reservations: {
      create: [],
    },
    dateIn: '16:30',
    dateEnd: '21:30',
  },
  {
    id: 14,
    name: 'division two holiday morning to afternoon',
    nameJa: '2区分日曜祝日午前〜午後',
    price: 47_500,
    studioId: 1,
    reservations: {
      create: [],
    },
    dateIn: '09:00',
    dateEnd: '16:30',
  },
  {
    id: 15,
    name: 'division two holiday afternoon to night',
    nameJa: '2区分日曜祝日午後〜夜間',
    price: 53_000,
    studioId: 1,
    reservations: {
      create: [],
    },
    dateIn: '16:30',
    dateEnd: '21:30',
  },
  {
    id: 16,
    name: 'division three weekday',
    nameJa: '3区分平日',
    price: 56_000,
    studioId: 1,
    reservations: {
      create: [],
    },
    dateIn: '09:00',
    dateEnd: '21:30',
  },
  {
    id: 17,
    name: 'division three saturday',
    nameJa: '3区分土曜',
    price: 71_000,
    studioId: 1,
    reservations: {
      create: [],
    },
    dateIn: '09:00',
    dateEnd: '21:30',
  },
  {
    id: 18,
    name: 'division three holiday',
    nameJa: '3区分日曜祝日',
    price: 75_000,
    studioId: 1,
    reservations: {
      create: [],
    },
    dateIn: '09:00',
    dateEnd: '21:30',
  },
];

export const plan = async () => {
  records.forEach(async record => {
    const { id, name, nameJa, price, studioId, reservations, dateIn, dateEnd } = record;
    await prisma.plan.upsert({
      where: {
        id,
      },
      create: {
        id, name, nameJa, price, studioId, reservations, dateIn, dateEnd,
      },
      update: {
        id, name, nameJa, price, studioId, reservations, dateIn, dateEnd,
      },
    });
  });
};
