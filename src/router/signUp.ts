import dayjs from 'dayjs'
import timezone from 'dayjs/plugin/timezone.js'
import utc from 'dayjs/plugin/utc.js'
import { type NextFunction, type Request, type Response } from 'express'
import logger from '../lib/logger.js'
import signUp from '../service/signUp.js'

dayjs.extend(utc)
dayjs.extend(timezone)

export default [
  async (request: Request, response: Response, next: NextFunction) => {
    const { email, password } = request.body
    try {
      const data = await signUp({ email, password })
      const jst = dayjs().tz('Asia/Tokyo').format('YYYY-MM-DD HH:mm:ss')
      logger.info(`User ${data.publicId} has been created at ${jst}(JST)`)
      response.status(201).json(data)
    } catch (error) {
      next(error)
    }
  }
]
