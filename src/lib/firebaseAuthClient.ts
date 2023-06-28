import 'dotenv/config.js'
import got, { type Response } from 'got'
import { logger } from './logger.js'

const FIREBASE_API_URL: string | undefined = process.env.FIREBASE_API_BASE_URL
const FIREBASE_API_KEY: string | undefined = process.env.FIREBASE_API_KEY

export interface SignInUser {
  idToken: string
  email: string
  refreshToken: string
  expiresIn: string
  localId: string
  registered: boolean
  kind: string
  displayName: string
}

export interface SignUpUser {
  kind: string
  idToken: string
  email: string
  refreshToken: string
  expiresIn: string
  localId: string
}

async function clientErrorHandle({ body, requestUrl, method }): Promise<never> {
  const { error } = JSON.parse(body as string)
  const message = {
    event: 'Failed to request to Firebase Auth',
    request: {
      url: `${requestUrl.pathname}`,
      method
    },
    statusCode: error.code,
    statusMessage: error.message
  }
  logger.warn(message)
  return await Promise.reject(new Error(error.message))
}

function clientSucceedDebugging({ response, requestUrl, method }): void {
  const message = {
    event: `Succeed to request to Firebase Auth`,
    request: {
      url: `${requestUrl.pathname}`,
      method
    },
    body: JSON.parse(response.body as string)
  }
  logger.debug(message)
}

class FirebaseAuthClient {
  private readonly client: typeof got
  constructor() {
    this.client = got.extend({
      prefixUrl: FIREBASE_API_URL,
      hooks: {
        beforeRequest: [
          (_options) => {
            if (FIREBASE_API_KEY === undefined) {
              throw new Error('FIRE_BASE_API_KEY is undefined')
            }
          }
        ],
        afterResponse: [
          async (response: Response): Promise<Response> => {
            const { body, requestUrl, method } = response
            if (!response.ok) {
              await clientErrorHandle({ body, requestUrl, method, response })
            }
            if (process.env.LOG_LEVEL === 'debug') {
              clientSucceedDebugging({ response, requestUrl, method })
            }
            return response
          }
        ]
      }
    })
  }

  public async postSignIn({ email, password }: Record<string, string>): Promise<SignInUser> {
    const signIn = async (): Promise<unknown> =>
      await this.client(`accounts:signInWithPassword?key=${FIREBASE_API_KEY}`, {
        method: 'POST',
        json: {
          email,
          password,
          returnSecureToken: true
        }
      }).json()
    const response = (await signIn()) as Promise<SignInUser>
    return response
  }

  public async postSignUp({ email, password }: Record<string, string>): Promise<SignUpUser> {
    const signUp = async (): Promise<unknown> =>
      await this.client(`accounts:signUp?key=${FIREBASE_API_KEY}`, {
        method: 'POST',
        json: {
          email,
          password,
          returnSecureToken: true
        }
      }).json()
    const response = (await signUp()) as Promise<SignUpUser>
    return response
  }

  public async sendConfirmationEmail({ idToken }): Promise<string> {
    const sendConfirmation = async (): Promise<unknown> =>
      await this.client(`accounts:sendOobCode?key=${FIREBASE_API_KEY}`, {
        method: 'POST',
        json: {
          requestType: 'VERIFY_EMAIL',
          idToken
        }
      }).json()
    const response = (await sendConfirmation()) as Promise<string>
    return response
  }
}

export const firebaseAuthClient = new FirebaseAuthClient()
