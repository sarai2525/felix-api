import { PrismaClient } from '@prisma/client';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone.js';
import utc from 'dayjs/plugin/utc.js';
import { getAuth } from 'firebase-admin/auth';
import { USER_ROLE } from '../constants/user.js';
import firebaseAdmin from '../lib/firebaseAdmin.js';
import FirebaseAuthClient from '../lib/firebaseAuthClient.js';
import logger from '../lib/logger.js';

dayjs.extend(utc);
dayjs.extend(timezone);

interface User {
  publicId: string;
  email: string;
  idToken: string;
}

export default async function signUp({ email, password }: Record<string, string>): Promise<User> {
  const { localId: publicId, email: emailAddress, idToken } = await FirebaseAuthClient.postSignUp({ email, password });
  const role = USER_ROLE.STAFF;
  await setCustomRole(publicId, role);
  await createUser({ publicId, emailAddress, role });
  await sendConfirmationEmail(idToken);
  return {
    publicId,
    email: emailAddress,
    idToken
  };
}

async function setCustomRole(publicId, role): Promise<void> {
  await getAuth(firebaseAdmin).setCustomUserClaims(publicId, {
    role
  });
}

async function createUser({ publicId, emailAddress, role }): Promise<void> {
  const prisma = new PrismaClient();
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
    });
    const jst = dayjs().tz('Asia/Tokyo').format('YYYY-MM-DD HH:mm:ss');
    logger.info(`User ${publicId} has been created at ${jst}(JST)`);
  } catch (error) {
    logger.error(error);
  } finally {
    await prisma.$disconnect();
    logger.debug('Prisma client disconnected');
  }
}

async function sendConfirmationEmail(idToken): Promise<string> {
  const email = await FirebaseAuthClient.sendConfirmationEmail({ idToken });
  return email;
}
