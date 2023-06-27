import { getAuth } from 'firebase-admin/auth'
import firebaseAdmin from '../lib/firebaseAdmin.js'
import FirebaseAuthClient from '../lib/firebaseAuthClient.js'

interface UpdatePassword {
  oldPassword: string
  newPassword: string
  email: string
}

export default async function updatePassword({ oldPassword, newPassword, email }: UpdatePassword): Promise<void> {
  const { localId: publicId, registered } = await FirebaseAuthClient.postSignIn({ email, password: oldPassword })

  if (!registered) {
    throw new Error('Invalid email or password')
  }

  const auth = getAuth(firebaseAdmin)
  await auth.updateUser(publicId, {
    password: newPassword
  })
}
