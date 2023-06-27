import { PrismaClient } from '@prisma/client'
import { getAuth } from 'firebase-admin/auth'
import firebaseAdmin from '../lib/firebaseAdmin.js'
import FirebaseAuthClient from '../lib/firebaseAuthClient.js'

interface UpdateEmail {
  oldEmail: string
  password: string
  newEmail: string
}

export default async function updateEmail({ oldEmail, password, newEmail }: UpdateEmail): Promise<string> {
  const { localId: publicId, registered } = await FirebaseAuthClient.postSignIn({ email: oldEmail, password })

  if (!registered) {
    throw new Error('Invalid email or password')
  }

  const auth = getAuth(firebaseAdmin)
  await auth.updateUser(publicId, {
    email: newEmail
  })

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

  return newEmail
}
