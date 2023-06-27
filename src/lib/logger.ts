import 'dotenv/config.js'
import { pino } from 'pino'
import { LOG_LEVEL } from '../logLevel.js'

export const logger = pino({ level: process.env.LOG_LEVEL ?? LOG_LEVEL.INFO })
