import { describe, expect, it } from 'vitest'
import deleteAccount from './deleteAccount.js'

describe('deleteAccount', () => {
  const email = 'xyz23@gmail.com'
  const password = 'Vampires13'

  describe('Delete Account', () => {
    it('should delete account successfully', async () => {
      const { message } = await deleteAccount({ email, password })
      expect(message).toBe('Account deleted successfully')
    })
    it('should throw error when email is empty', async () => {
      const email = ''
      await expect(deleteAccount({ email, password })).rejects.toThrowError('Email and password are required')
    })
    it('should throw error when password is empty', async () => {
      const password = ''
      await expect(deleteAccount({ email, password })).rejects.toThrowError('Email and password are required')
    })
    it('should throw error when email is wrong', async () => {
      const email = 'wrongemail@newell-productions.com'
      await expect(deleteAccount({ email, password })).rejects.toThrowError('Invalid email or password')
    })
    it('should throw error when password is wrong', async () => {
      const password = 'wrongPassword'
      await expect(deleteAccount({ email, password })).rejects.toThrowError('Invalid email or password')
    })
  })
})
