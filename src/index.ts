import cookieParser from 'cookie-parser'
import express, { type Response } from 'express'
import router from './router/v1/index.js'

const app = express()
const port = 8000
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use('/api/v1', router)
app.get('/', (_request, response: Response) => {
  response.send('Hello World!')
})

app.listen(port, () => {
  console.log(`🚀 http://localhost:${port} 🚀`)
})
