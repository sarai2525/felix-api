import { describe, expect, it } from 'vitest'
import { USER_ROLE } from '../../src/constants/user.js'
import { auth, setCustomRole } from '../../src/service/signUp.js'

describe('signUp', () => {
  let email = 'test.user@newell-productions.com'
  let password = 'tomato1234'
  let role = USER_ROLE.GUEST

  describe('auth', () => {
    it('should return user information', async () => {
      let email = `test.user${Math.random()}@newell-productions.com`
      const { email: emailAddress, idToken } = await auth({ email, password })
      expect(emailAddress).toBe(email)
      expect(idToken).not.toBe('')
    })
    it('should throw error when user is already exist', async () => {
      await expect(auth({ email, password })).rejects.toThrowError('EMAIL_EXIST')
    })
    it('should throw error when email is empty', async () => {
      let email = ''
      await expect(auth({ email, password })).rejects.toThrowError('MISSING_EMAIL')
    })
  })
  describe('setCustomRole', () => {
    it('should set custom role', async () => {
      let email = `test.user${Math.random()}@newell-productions.com`
      const { localId: publicId } = await auth({ email, password })
      await expect(setCustomRole({ publicId, role })).resolves.not.toThrowError()
    })
    it('should throw error when publicId is empty', async () => {
      let publicId = ''
      await expect(setCustomRole({ publicId, role })).rejects.toThrowError('P2025')
    })
    it('should throw error when publicId is wrong', async () => {
      let publicId = 'wrongPublicId'
      await expect(setCustomRole({ publicId, role })).rejects.toThrowError('P2025')
    })
  })
  describe('createUser', () => {})
})
