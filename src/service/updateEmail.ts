import pkg from '@prisma/client'
import dayjs from 'dayjs'
import timezone from 'dayjs/plugin/timezone.js'
import utc from 'dayjs/plugin/utc.js'
import { getAuth, type UserRecord } from 'firebase-admin/auth'
import { firebaseAdmin } from '../lib/firebaseAdmin.js'
import { firebaseAuthClient } from '../lib/firebaseAuthClient.js'
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

interface UpdateEmail {
  oldEmail: string
  password: string
  newEmail: string
}

export default async function updateEmail({ oldEmail, password, newEmail }: UpdateEmail): Promise<User> {
  const {
    localId: publicId,
    displayName,
    idToken,
    registered
  } = await firebaseAuthClient.postSignIn({ email: oldEmail, password })

  if (!registered) {
    throw new Error('INVALID_PASSWORD')
  }

  const auth = getAuth(firebaseAdmin)
  await auth.updateUser(publicId, {
    email: newEmail
  })

  await updateEmailInDB({ publicId, newEmail })

  const user: UserRecord = await auth.getUser(publicId)

  return {
    publicId,
    displayName,
    idToken,
    registered,
    email: newEmail,
    role: user.customClaims!.role
  }
}

async function updateEmailInDB({ publicId, newEmail }): Promise<void> {
  const prisma = new PrismaClient()
  try {
    await prisma.user.update({
      where: {
        publicId
      },
      data: {
        email: newEmail
      }
    })
  } catch (error) {
    await Promise.reject(new Error(error))
  } finally {
    await prisma.$disconnect()
  }
}
