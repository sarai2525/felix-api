import { PrismaClient } from '@prisma/client'
import { getAuth, type UserRecord } from 'firebase-admin/auth'
import { USER_ROLE } from '../../constants/user.js'
import firebaseAdmin from '../../lib/firebaseAdmin.js'

const prisma = new PrismaClient()

async function listUsers(): Promise<UserRecord[]> {
  return (await getAuth(firebaseAdmin).listUsers(10)).users
}

async function getUser(publicId: string): Promise<UserRecord> {
  return await getAuth(firebaseAdmin).getUser(publicId)
}

export const user = async (): Promise<void> => {
  // eslint-disable-next-line @typescript-eslint/await-thenable
  const records = await listUsers()
  records.forEach(async (record): Promise<void> => {
    const { customClaims } = await getUser(record.uid)
    await prisma.user.upsert({
      where: {
        publicId: record.uid
      },
      create: {
        publicId: record.uid,
        email: record.email ?? '',
        role: customClaims?.role ?? USER_ROLE.GUEST,
        reservation: {
          create: []
        },
        firstName: '',
        lastName: '',
        phoneNumber: null
      },
      update: {
        publicId: record.uid,
        email: record.email,
        role: customClaims?.role ?? USER_ROLE.GUEST,
        reservation: {
          create: []
        },
        firstName: '',
        lastName: '',
        phoneNumber: null
      }
    })
  })
}
