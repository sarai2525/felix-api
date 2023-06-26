import { PrismaClient } from '@prisma/client'
import { getAuth, type UserRecord } from 'firebase-admin/auth'
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
  const records = await await listUsers()
  records.forEach(async (record): Promise<void> => {
    const { email, uid } = record
    const { customClaims } = await getUser(uid)
    await prisma.user.upsert({
      where: {
        publicId: uid
      },
      create: {
        publicId: uid,
        email,
        role: customClaims!.role,
        reservation: {
          create: []
        },
        firstName: '',
        lastName: '',
        phoneNumber: null
      },
      update: {
        publicId: uid,
        email,
        role: customClaims!.role,
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
