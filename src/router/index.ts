import { Router } from 'express'
import signIn from '../router/signIn.js'
import signUp from '../router/signUp.js'
import updateEmail from '../router/updateEmail.js'
import updatePassword from '../router/updatePassword.js'
const router = Router()

router.post('/sign-in', signIn)
router.post('/sign-up', signUp)
router.post('/update-email', updateEmail)
router.post('/update-password', updatePassword)

export default router
