import { PrismaClient } from '@prisma/client';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone.js';
import utc from 'dayjs/plugin/utc.js';
import { getAuth, type UserRecord } from 'firebase-admin/auth';
import firebaseAdmin from '../lib/firebaseAdmin.js';
import FirebaseAuthClient from '../lib/firebaseAuthClient.js';
import logger from '../lib/logger.js';

dayjs.extend(utc);
dayjs.extend(timezone);

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
        lastLogin: dayjs().utc().toISOString()
      }
    });
    const jst = dayjs().tz('Asia/Tokyo').format('YYYY-MM-DD HH:mm:ss');
    logger.info(`User ${publicId} logged in at ${jst}(JST)`);
  } catch (error) {
    logger.error(error);
  } finally {
    await prisma.$disconnect();
    logger.debug('Prisma client disconnected');
  }
}
