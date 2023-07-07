import { test } from 'vitest'
import updateEmail from './updateEmail.js'

test('updateEmail', async ({ expect }) => {
  const oldEmail = 'xyz@gmail.com' // Change this to your test user's email
  const newEmail = 'xyz123@gmail.com' // Change this to the new email you want to test
  const password = 'Vampires13' // Change this to your test user's password

  test('should return user information', async () => {
    const user = await updateEmail({ oldEmail, newEmail, password })
    expect(user.email).toBe(newEmail)
  })

  test('should throw error when old email is incorrect', async () => {
    const oldEmail = 'incorrectEmail'
    await expect(updateEmail({ oldEmail, newEmail, password })).rejects.toThrowError('EMAIL_NOT_FOUND')
  })
})
