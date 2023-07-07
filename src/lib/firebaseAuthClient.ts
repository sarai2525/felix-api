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

export interface SuccessResponse {
  message: string
}

async function clientErrorHandle({ body, requestUrl, method }: Response): Promise<never> {
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
  throw new Error(error.message)
}

function clientSucceedDebugging({ response, requestUrl, method }: Response): void {
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
    return await response
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
    return await response
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

    return await response
  }

  public async updateEmail({ idToken, newEmail, password }: Record<string, string>): Promise<SignInUser> {
    const currentUser: SignInUser = await this.postSignIn({ email: newEmail, password })

    if (currentUser.idToken !== undefined && currentUser.idToken !== null && currentUser.idToken.trim() !== '') {
      await this.client(`accounts:update?key=${FIREBASE_API_KEY}`, {
        method: 'POST',
        json: {
          idToken,
          email: newEmail,
          returnSecureToken: true
        }
      }).json()

      const updatedUser: SignInUser = await this.postSignIn({ email: newEmail, password })

      return updatedUser
    } else {
      throw new Error('Invalid password')
    }
  }

  public async updatePassword({ idToken, newPassword, email }: Record<string, string>): Promise<SignInUser> {
    await this.client(`accounts:setAccountInfo?key=${FIREBASE_API_KEY}`, {
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

  public async deleteAccount({ idToken }: Record<string, string>): Promise<SuccessResponse> {
    const response: any = await this.client(`accounts:delete?key=${FIREBASE_API_KEY}`, {
      method: 'POST',
      json: {
        idToken
      }
    }).json()

    if (
      response === undefined ||
      typeof response !== 'object' ||
      !('kind' in response) ||
      response.kind !== 'identitytoolkit#DeleteAccountResponse'
    ) {
      throw new Error('Failed to delete account')
    }

    return { message: 'Account deleted successfully' }
  }

  public async postDeleteAccount({ email, password }: Record<string, string>): Promise<SuccessResponse> {
    const user = await this.postSignIn({ email, password })
    if (user === undefined || typeof user !== 'object' || !('idToken' in user)) {
      throw new Error('Invalid email or password')
    }

    const deleteResponse = await this.deleteAccount({ idToken: user.idToken })

    return deleteResponse
  }
}

export const firebaseAuthClient = new FirebaseAuthClient()
