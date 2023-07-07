import { Router } from 'express'
import signIn from './signIn.js'
import signUp from './signUp.js'

import deleteAccount from './deleteAccount.js'
import updateEmail from './updateEmail.js'
import updatePassword from './updatePassword.js'

const router = Router()

router.post('/sign-in', signIn)
router.post('/sign-up', signUp)
router.post('/update-email', updateEmail)
router.post('/update-password', updatePassword)
router.post('/delete-account', deleteAccount)

export default router
