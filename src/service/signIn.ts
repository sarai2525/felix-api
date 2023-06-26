import { PrismaClient } from '@prisma/client'
import dayjs from 'dayjs'
import timezone from 'dayjs/plugin/timezone.js'
import utc from 'dayjs/plugin/utc.js'
import { getAuth, type UserRecord } from 'firebase-admin/auth'
import firebaseAdmin from '../lib/firebaseAdmin.js'
import FirebaseAuthClient from '../lib/firebaseAuthClient.js'

dayjs.extend(utc)
dayjs.extend(timezone)

interface User {
  publicId: string
  displayName: string
  registered: boolean
  idToken: string
  email: string
  role: string
}

interface SignIn {
  email: string
  password: string
  role?: string
}

export default async function signIn({ email, password }: SignIn): Promise<User> {
  const {
    localId: publicId,
    displayName,
    idToken,
    registered
  } = await FirebaseAuthClient.postSignIn({ email, password })
  const user: UserRecord = await getAuth(firebaseAdmin).getUser(publicId)
  await updateLastLogin({ publicId })
  return {
    publicId,
    displayName,
    idToken,
    registered,
    email,
    role: user.customClaims!.role
  }
}

async function updateLastLogin({ publicId }): Promise<void> {
  const prisma = new PrismaClient()
  try {
    await prisma.user.update({
      where: {
        publicId
      },
      data: {
        lastLogin: dayjs().utc().toISOString()
      }
    })
  } catch (error) {
    await Promise.reject(new Error(error))
  } finally {
    await prisma.$disconnect()
  }
}
