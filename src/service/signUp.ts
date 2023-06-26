import { PrismaClient } from '@prisma/client';
import { getAuth } from 'firebase-admin/auth';
import { USER_ROLE } from '../constants/user.js';
import firebaseAdmin from '../lib/firebaseAdmin.js';
import FirebaseAuthClient from '../lib/firebaseAuthClient.js';

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
  } catch (error) {
    await Promise.reject(new Error(error));
  } finally {
    await prisma.$disconnect();
  }
}

async function sendConfirmationEmail(idToken): Promise<string> {
  const email = await FirebaseAuthClient.sendConfirmationEmail({ idToken });
  return email;
}
