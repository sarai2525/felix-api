import dayjs from 'dayjs'
import timezone from 'dayjs/plugin/timezone.js'
import utc from 'dayjs/plugin/utc.js'
import { type NextFunction, type Request, type Response } from 'express'
import { logger } from '../../lib/logger.js'
import deleteAccount from '../../service/deleteAccount.js'

dayjs.extend(utc)
dayjs.extend(timezone)

export default [
  async (request: Request, response: Response, next: NextFunction) => {
    const { email, password } = request.body

    // Check if email and password are provided
    if (typeof email !== 'string' || email === '' || typeof password !== 'string' || password === '') {
      return response.status(400).json({ message: 'Email and password are required' })
    }

    try {
      const data = await deleteAccount({ email, password })
      const jst = dayjs().tz('Asia/Tokyo').format('YYYY-MM-DD HH:mm:ss')
      logger.info(`User ${data.publicId} deleted account at ${jst}(JST)`)
      response.status(200).json({ message: 'Account deleted successfully' })
    } catch (error) {
      // Add error message in the response
      response.status(500).json({ message: error.message })
      next(error)
    }
  }
]
