import 'dotenv/config';
import { cert, getApp, getApps, initializeApp } from 'firebase-admin/app';

const firebaseCert = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  privateKey: process.env.FIREBASE_PRIVATE_KEY!.replace(/\\n/g, '\n') // Ref: https://stackoverflow.com/questions/50299329/node-js-firebase-service-account-private-key-wont-parse
};

const firebaseAdmin =
  getApps().length === 0
    ? initializeApp({
        credential: cert(firebaseCert)
      })
    : getApp();

export default firebaseAdmin;
