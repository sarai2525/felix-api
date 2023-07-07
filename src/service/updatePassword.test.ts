import { describe, expect, it } from 'vitest'
import updatePassword from './updatePassword.js'

describe('updatePassword', () => {
  const oldPassword = 'Vampires13'
  const newPassword = 'Vampires13&'
  const email = 'xyzpass@gmail.com'

  describe('Update Password', () => {
    it('should return user information', async () => {
      const user = await updatePassword({ oldPassword, newPassword, email })
      expect(user.email).toBe(email)
    })

    it('should throw error when old password is incorrect', async () => {
      const oldPassword = 'incorrectPassword'
      await expect(updatePassword({ oldPassword, newPassword, email })).rejects.toThrowError('INVALID_PASSWORD')
    })
  })
})
