import got from 'got';
import consola from 'consola';
import 'dotenv/config.js';

const FIREBASE_API_URL: string | undefined = process.env.FIREBASE_API_BASE_URL;
const FIREBASE_API_KEY: string | undefined = process.env.FIREBASE_API_KEY;

export interface SignInUser {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered: boolean;
  kind: string;
  displayName: string;
}

export interface SignUpUser {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
}

class FirebaseAuthClient {
  private readonly client: typeof got;
  constructor() {
    this.client = got.extend({
      prefixUrl: FIREBASE_API_URL,
      hooks: {
        beforeRequest: [
          (options) => {
            if (FIREBASE_API_KEY === undefined) {
              throw new Error('FIRE_BASE_API_KEY is undefined');
            }
            const { method } = options;
            consola.info(`[${method}] Request to Firebase Auth`);
          }
        ],
        afterResponse: [
          // TODO: Fix ts2322
          // (response)=> {
          //   if (response!.ok) {
          //     const {requestUrl: {
          //       pathname,
          //     }} = response;
          //     const message = JSON.stringify({
          //       event: `Succeed to request to Firebase Auth ${pathname}`,
          //     });
          //     consola.success(message);
          //     return response;
          //   }
          //   const { statusCode } = response;
          //   const message = JSON.stringify({
          //     event: 'Failed to request to Firebase Auth',
          //     statusCode,
          //   });
          //   consola.error(message);
          // },
        ]
      }
    });
  }

  // Document: https://firebase.google.com/docs/reference/rest/auth#section-create-email-password
  public async postSignIn({
    email = 's.arai@newell-productions.com',
    password = 'tomato1234'
  }: Record<string, string>): Promise<SignInUser> {
    const response: SignInUser = await this.client(`accounts:signInWithPassword?key=${FIREBASE_API_KEY?.toString()}`, {
      method: 'POST',
      json: {
        email,
        password,
        returnSecureToken: true
      }
    }).json();
    return response;
  }

  public async postSignUp({
    email = 'dummy3@newell-productions.com',
    password = 'tomato1234'
  }: Record<string, string>): Promise<SignUpUser> {
    const response: SignUpUser = await this.client(`accounts:signUp?key=${FIREBASE_API_KEY?.toString()}`, {
      method: 'POST',
      json: {
        email,
        password,
        returnSecureToken: true
      }
    }).json();
    return response;
  }
}
export default new FirebaseAuthClient();
