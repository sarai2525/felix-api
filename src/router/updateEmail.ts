import { type NextFunction, type Request, type Response } from 'express'
import updateEmail from '../service/updateEmail.js'

export default [
  async (request: Request, response: Response, next: NextFunction) => {
    const { oldEmail, password, newEmail } = request.body
    try {
      const data = await updateEmail({ oldEmail, password, newEmail })
      response.status(200).json({ message: 'Email updated successfully', newEmail: data.email })
    } catch (error) {
      next(error)
    }
  }
]
