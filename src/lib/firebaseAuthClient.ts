import ky from 'ky';
import consola from 'consola';
// eslint-disable-next-line import/no-unassigned-import
import 'dotenv/config';

export type SignInUser = {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered: boolean;
  kind: string;
  displayName: string;
};

class FirebaseAuthClient {
  private readonly client: typeof ky;
  constructor() {
    this.client = ky.create({
      prefixUrl: process.env.FIREBASE_API_BASE_URL,
      hooks: {
        beforeRequest: [
          (request: Request) => {
            consola.info(`[Request to Firebase Auth]: ${request.url}`);
          },
        ],
        afterResponse: [
          async (_request: Request, _options, response: Response) => {
            if (response.ok) {
              const { status, statusText } = response;
              const message = JSON.stringify({
                event: 'Succeed to request to Firebase Auth',
                status,
                statusText,
              });
              consola.success(message);
              return response;
            }

            const { status, statusText } = response;
            const message = JSON.stringify({
              event: 'Failed to request to Firebase Auth',
              status,
              statusText,
            });
            consola.error(message);
          },
        ],
      },
    });
  }

  // Document: https://firebase.google.com/docs/reference/rest/auth#section-create-email-password
  public async postSignIn({
    email = 's.arai@newell-productions.com',
    password = 'tomato1234',
  }: Record<string, string>) {
    if (!process.env.FIREBASE_API_KEY) {
      throw new Error('FIREBASE_API_KEY is not defined');
    }

    const response = await this.client.post(
      `accounts:signInWithPassword?key=${process.env.FIREBASE_API_KEY}`,
      {
        json: {
          email,
          password,
          returnSecureToken: true,
        },
      },
    );
    const user: SignInUser = await response.json();
    return user;
  }
}
export default new FirebaseAuthClient();
