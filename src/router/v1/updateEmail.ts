import dayjs from 'dayjs'
import timezone from 'dayjs/plugin/timezone.js'
import utc from 'dayjs/plugin/utc.js'
import { type NextFunction, type Request, type Response } from 'express'
import { logger } from '../../lib/logger.js'
import updateEmail from '../../service/updateEmail.js'

dayjs.extend(utc)
dayjs.extend(timezone)

export default [
  async (request: Request, response: Response, next: NextFunction) => {
    const { oldEmail, password, newEmail } = request.body
    try {
      const data = await updateEmail({ oldEmail, password, newEmail })
      const jst = dayjs().tz('Asia/Tokyo').format('YYYY-MM-DD HH:mm:ss')
      logger.info(`User ${data.publicId} updated email from ${oldEmail} to ${newEmail} at ${jst}(JST)`)
      response.status(200).json({ message: 'Email updated successfully', newEmail: data.email })
    } catch (error) {
      next(error)
    }
  }
]
