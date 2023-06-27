import { type NextFunction, type Request, type Response } from 'express'
import updatePassword from '../service/updatePassword.js'

export default [
  async (request: Request, response: Response, next: NextFunction) => {
    const { oldPassword, newPassword, email } = request.body
    try {
      await updatePassword({ oldPassword, newPassword, email })
      response.status(200).json({ message: 'Password updated successfully' })
    } catch (error) {
      next(error)
    }
  }
]
