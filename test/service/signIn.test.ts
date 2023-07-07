import { getAuth } from 'firebase-admin/auth'
import { describe, expect, it } from 'vitest'
import { USER_ROLE } from '../../src/constants/user.js'
import { firebaseAdmin } from '../../src/lib/firebaseAdmin.js'
import { auth, updateLastLogin } from '../../src/service/signIn.js'

describe('signIn', () => {
  let email = 'test.user@newell-productions.com'
  let password = 'tomato1234'

  describe('auth', () => {
    it('should return user information', async () => {
      const { localId: publicId, displayName, idToken, registered } = await auth({ email, password })
      const user = await getAuth(firebaseAdmin).getUser(publicId)
      expect(user.customClaims!.role).toBe(USER_ROLE.GUEST)
      expect(displayName).toBe('')
      expect(registered).toBe(true)
      expect(idToken).not.toBe('')
    })
    it('should throw error when email is empty', async () => {
      let email = ''
      await expect(auth({ email, password })).rejects.toThrowError('INVALID_EMAIL')
    })
    it('should throw error when email is wrong', async () => {
      let email = 'wron@newell-productions.com'
      await expect(auth({ email, password })).rejects.toThrowError('EMAIL_NOT_FOUND')
    })
    it('should throw error when password is empty', async () => {
      let email = 'test.user@newell-productions.com'
      let password = ''
      await expect(auth({ email, password })).rejects.toThrowError('MISSING_PASSWORD')
    })
    it('should throw error when password is wron', async () => {
      let email = 'test.user@newell-productions.com'
      let password = 'wrongPassword'
      await expect(auth({ email, password })).rejects.toThrowError('INVALID_PASSWORD')
    })
  })
  describe('updateLastLogin', () => {
    it('should update last login', async () => {
      const { localId: publicId } = await auth({ email, password })
      await expect(updateLastLogin(publicId)).resolves.not.toThrowError()
    })
    it('should throw error when publicId is empty', async () => {
      let publicId = ''
      await expect(updateLastLogin(publicId)).rejects.toThrowError('P2025')
    })
    it('should throw error when publicId is wrong', async () => {
      let publicId = 'wrongPublicId'
      await expect(updateLastLogin(publicId)).rejects.toThrowError('P2025')
    })
  })
})
