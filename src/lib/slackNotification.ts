import { IncomingWebhook } from '@slack/webhook'
import dayjs from 'dayjs'
import timezone from 'dayjs/plugin/timezone.js'
import utc from 'dayjs/plugin/utc.js'
import 'dotenv/config.js'
import { NODE_ENV } from '../constants/nodeEnv.js'

dayjs.extend(utc)
dayjs.extend(timezone)

export async function slackWebhookSend(text: string): Promise<void> {
  if (process.env.NODE_ENV === NODE_ENV.PRODUCTION) {
    const url: string = process.env?.SLACK_WEBHOOK_URL ?? ''
    const webhook = new IncomingWebhook(url)
    await webhook.send({
      text: `Error occurred at \`${dayjs().tz('Asia/Tokyo').format('YYYY/MM/DD HH:mm:ss')}(JST)\`\n${text}`,
      username: 'Error Notifier Bot',
      icon_emoji: ':george:'
    })
  }
}
