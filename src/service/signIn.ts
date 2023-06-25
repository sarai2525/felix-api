import { PrismaClient } from '@prisma/client';
import consola from 'consola';
import dayjs from 'dayjs';
import { getAuth, type UserRecord } from 'firebase-admin/auth';
import firebaseAdmin from '../lib/firebaseAdmin.js';
import FirebaseAuthClient from '../lib/firebaseAuthClient.js';

interface User {
  publicId: string;
  displayName: string;
  registered: boolean;
  refreshToken: string;
  idToken: string;
  email: string;
  role: string;
}

export default async function signIn({ email, password }: Record<string, string>): Promise<User> {
  const {
    localId: publicId,
    displayName,
    idToken,
    registered,
    refreshToken
  } = await FirebaseAuthClient.postSignIn({ email, password });
  const user: UserRecord = await getAuth(firebaseAdmin).getUser(publicId);
  await updateLastLogin({ publicId });
  return {
    publicId,
    displayName,
    idToken,
    registered,
    refreshToken,
    email,
    role: user.customClaims!.role
  };
}

async function updateLastLogin({ publicId }): Promise<void> {
  const prisma = new PrismaClient();
  try {
    await prisma.user.update({
      where: {
        publicId
      },
      data: {
        lastLogin: dayjs().toISOString()
      }
    });
    consola.info(`User ${publicId} logged in`);
  } catch (error) {
    consola.error(error);
  } finally {
    await prisma.$disconnect();
    consola.info('Prisma client disconnected');
  }
}
