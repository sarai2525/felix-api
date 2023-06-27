import pkg from '@prisma/client'
const { PrismaClient } = pkg
const prisma = new PrismaClient()

const records = [
  {
    id: 1,
    name: 'hall',
    status: 'AVAILABLE',
    plans: {
      create: []
    }
  },
  {
    id: 2,
    name: 'studio',
    status: 'AVAILABLE',
    plans: {
      create: []
    }
  }
]

export const studio = async (): Promise<void> => {
  records.forEach(async (record): Promise<void> => {
    const { id, name, plans } = record
    await prisma.studio.upsert({
      where: {
        id
      },
      create: {
        id,
        name,
        status: 'AVAILABLE',
        plans
      },
      update: {
        id,
        name,
        status: 'AVAILABLE',
        plans
      }
    })
  })
}
