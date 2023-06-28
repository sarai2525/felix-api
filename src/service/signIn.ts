import pkg from '@prisma/client'
import dayjs from 'dayjs'
import timezone from 'dayjs/plugin/timezone.js'
import utc from 'dayjs/plugin/utc.js'
import { getAuth, type UserRecord } from 'firebase-admin/auth'
import { firebaseAdmin } from '../lib/firebaseAdmin.js'
import { firebaseAuthClient, type SignInUser } from '../lib/firebaseAuthClient.js'
import { logger } from '../lib/logger.js'
const { PrismaClient } = pkg

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
}

export default async function signIn({ email, password }: SignIn): Promise<User> {
  const { localId: publicId, displayName, idToken, registered } = await auth({ email, password })
  const user: UserRecord = await getAuth(firebaseAdmin).getUser(publicId)
  await updateLastLogin(publicId)
  return {
    publicId,
    displayName,
    idToken,
    registered,
    email,
    role: user.customClaims!.role
  }
}

export async function auth({ email, password }): Promise<SignInUser> {
  return await firebaseAuthClient.postSignIn({ email, password })
}

export async function updateLastLogin(publicId: string): Promise<void> {
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
    const { code, meta: cause } = error
    logger.warn(`${cause.cause}`)
    await Promise.reject(new Error(code))
  } finally {
    await prisma.$disconnect()
  }
}
