import pkg from '@prisma/client'
import { getAuth } from 'firebase-admin/auth'
import { USER_ROLE } from '../constants/user.js'
import { firebaseAdmin } from '../lib/firebaseAdmin.js'
import { firebaseAuthClient, type SignUpUser } from '../lib/firebaseAuthClient.js'
const { PrismaClient } = pkg

interface User {
  publicId: string
  email: string
  idToken: string
}

interface SignUp {
  email: string
  password: string
  role: string
}

export default async function signUp({ email, password, role }: SignUp): Promise<User> {
  const { localId: publicId, email: emailAddress, idToken } = await auth({ email, password })
  await setCustomRole({ publicId, role })
  await createUser({ publicId, emailAddress, role })
  await sendConfirmationEmail(idToken)
  return {
    publicId,
    email: emailAddress,
    idToken
  }
}

export async function auth({ email, password }): Promise<SignUpUser> {
  return await firebaseAuthClient.postSignUp({ email, password })
}

export async function setCustomRole({ publicId, role }): Promise<void> {
  await getAuth(firebaseAdmin).setCustomUserClaims(publicId, {
    role: role ?? USER_ROLE.GUEST
  })
}

export async function createUser({ publicId, emailAddress, role }): Promise<void> {
  const prisma = new PrismaClient()
  try {
    await prisma.user.create({
      data: {
        publicId,
        email: emailAddress,
        firstName: '',
        lastName: '',
        phoneNumber: '',
        role
      }
    })
  } catch (error) {
    await Promise.reject(new Error(error))
  } finally {
    await prisma.$disconnect()
  }
}

export async function sendConfirmationEmail(idToken): Promise<string> {
  const email = await firebaseAuthClient.sendConfirmationEmail({ idToken })
  return email
}
