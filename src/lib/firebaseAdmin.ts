import {
  initializeApp,
  getApps,
  getApp,
  cert,
  type App,
} from 'firebase-admin/app';
// eslint-disable-next-line import/no-unassigned-import
import 'dotenv/config';

const firebaseCert = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  privateKey: process.env.FIREBASE_PRIVATE_KEY!.replace(/\\n/g, '\n'), // Ref: https://stackoverflow.com/questions/50299329/node-js-firebase-service-account-private-key-wont-parse
};

const firebaseAdmin: App
  = getApps().length === 0
    ? initializeApp({
      credential: cert(firebaseCert),
    })
    : getApp();

export default firebaseAdmin;
