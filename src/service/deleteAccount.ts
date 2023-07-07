import { PrismaClient } from '@prisma/client'
import { getAuth } from 'firebase-admin/auth'
import { firebaseAdmin } from '../lib/firebaseAdmin.js'
import { firebaseAuthClient } from '../lib/firebaseAuthClient.js'

interface DeleteAccount {
  email: string
  password: string
}

export default async function deleteAccount({ email, password }: DeleteAccount): Promise<{ message: string }> {
  // Validate input
  if (email === '' || password === '') {
    throw new Error('Email and password are required')
  }

  // Try to sign in the user
  let user
  try {
    user = await firebaseAuthClient.postSignIn({ email, password })
  } catch (error) {
    throw new Error('Invalid email or password')
  }

  if (typeof user !== 'object' || !(user instanceof Object) || !('localId' in user) || !('registered' in user)) {
    throw new Error('Invalid response')
  }

  const { localId: publicId, registered } = user

  if (registered !== true) {
    throw new Error('User not registered')
  }

  const auth = getAuth(firebaseAdmin)
  const prisma = new PrismaClient()

  // Try to delete user from the database
  try {
    await prisma.user.delete({
      where: {
        publicId
      }
    })
  } catch (error) {
    throw new Error('Failed to delete user from the database')
  }

  // Try to delete user from Firebase Admin
  try {
    await auth.deleteUser(publicId)
  } catch (error) {
    throw new Error('Failed to delete user from Firebase')
  }

  // Try to delete user from Firebase Auth (this should be last)
  try {
    const deleteResponse = await firebaseAuthClient.postDeleteAccount({ email, password })
    if (typeof deleteResponse !== 'object' || !(deleteResponse instanceof Object) || !('message' in deleteResponse)) {
      throw new Error('Failed to delete user from Firebase Auth')
    }
  } catch (error) {
    if (error.message !== 'EMAIL_NOT_FOUND') {
      throw new Error('Failed to delete user from Firebase Auth')
    }
  }

  // Disconnect Prisma client
  await prisma.$disconnect()

  return { message: 'Account deleted successfully' }
}
