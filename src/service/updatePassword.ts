import dayjs from 'dayjs'
import timezone from 'dayjs/plugin/timezone.js'
import utc from 'dayjs/plugin/utc.js'
import { getAuth, type UserRecord } from 'firebase-admin/auth'
import { firebaseAdmin } from '../lib/firebaseAdmin.js'
import { firebaseAuthClient } from '../lib/firebaseAuthClient.js'

dayjs.extend(utc)
dayjs.extend(timezone)

interface User {
  publicId: string
  displayName: string
  registered: boolean
  idToken: string
  email: string
  role: string
}

interface UpdatePassword {
  oldPassword: string
  newPassword: string
  email: string
}

export default async function updatePassword({ oldPassword, newPassword, email }: UpdatePassword): Promise<User> {
  const {
    localId: publicId,
    displayName,
    idToken,
    registered
  } = await firebaseAuthClient.postSignIn({ email, password: oldPassword })

  if (!registered) {
    throw new Error('Invalid password')
  }

  const auth = getAuth(firebaseAdmin)
  await auth.updateUser(publicId, {
    password: newPassword
  })

  const user: UserRecord = await auth.getUser(publicId)
  return {
    publicId,
    displayName,
    idToken,
    registered,
    email,
    role: user.customClaims!.role
  }
}
