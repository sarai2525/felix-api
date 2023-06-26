import { Router } from 'express'
import signIn from '../router/signIn.js'
import signUp from '../router/signUp.js'

const router = Router()

router.post('/sign-in', signIn)
router.post('/sign-up', signUp)

export default router
