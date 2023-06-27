import 'dotenv/config.js'
import got from 'got'
import logger from './logger.js'

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

export interface UpdateEmailResponse {
  idToken: string
  email: string
  refreshToken: string
  expiresIn: string
  localId: string
}

export interface UpdatePasswordResponse {
  idToken: string
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
          async (response) => {
            const { body, requestUrl, method } = response
            if (!response.ok) {
              await clientErrorHandle({ body, requestUrl, method })
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
    const response: SignInUser = await this.client(`accounts:signInWithPassword?key=${FIREBASE_API_KEY}`, {
      method: 'POST',
      json: {
        email,
        password,
        returnSecureToken: true
      }
    }).json()
    return response
  }

  public async postSignUp({ email, password }: Record<string, string>): Promise<SignUpUser> {
    const response: SignUpUser = await this.client(`accounts:signUp?key=${FIREBASE_API_KEY}`, {
      method: 'POST',
      json: {
        email,
        password,
        returnSecureToken: true
      }
    }).json()
    return response
  }

  public async sendConfirmationEmail({ idToken }): Promise<string> {
    const response: string = await this.client(`accounts:sendOobCode?key=${FIREBASE_API_KEY}`, {
      method: 'POST',
      json: {
        requestType: 'VERIFY_EMAIL',
        idToken
      }
    }).json()
    return response
  }

  public async updateEmail({ idToken, newEmail, password }): Promise<SignInUser> {
    await this.client(`accounts:update?key=${FIREBASE_API_KEY}`, {
      method: 'POST',
      json: {
        idToken,
        email: newEmail,
        returnSecureToken: true
      }
    }).json()

    const user: SignInUser = await this.postSignIn({ email: newEmail, password })

    return user
  }

  public async updatePassword({ idToken, newPassword, email }): Promise<SignInUser> {
    await this.client(`accounts:update?key=${FIREBASE_API_KEY}`, {
      method: 'POST',
      json: {
        idToken,
        password: newPassword,
        returnSecureToken: true
      }
    }).json()

    const user: SignInUser = await this.postSignIn({ email, password: newPassword })

    return user
  }
}

export default new FirebaseAuthClient()
