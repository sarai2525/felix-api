import { Router } from 'express'
import signIn from './signIn.js'
import signUp from './signUp.js'

const router = Router()

router.post('/sign-in', signIn)
router.post('/sign-up', signUp)

export default router
