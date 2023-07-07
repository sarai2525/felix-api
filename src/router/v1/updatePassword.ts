import dayjs from 'dayjs'
import timezone from 'dayjs/plugin/timezone.js'
import utc from 'dayjs/plugin/utc.js'
import { type NextFunction, type Request, type Response } from 'express'
import { logger } from '../../lib/logger.js'
import updatePassword from '../../service/updatePassword.js'

dayjs.extend(utc)
dayjs.extend(timezone)

export default [
  async (request: Request, response: Response, next: NextFunction) => {
    const { oldPassword, newPassword, email } = request.body
    try {
      const data = await updatePassword({ oldPassword, newPassword, email })
      const jst = dayjs().tz('Asia/Tokyo').format('YYYY-MM-DD HH:mm:ss')
      logger.info(`User ${data.publicId} updated password at ${jst}(JST)`)
      response.status(200).json({ message: 'Password updated successfully' })
    } catch (error) {
      next(error)
    }
  }
]
