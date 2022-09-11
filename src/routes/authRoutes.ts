import { Router } from 'express'
import { SignUpController, SignInController } from '../controllers'

const signUpController = new SignUpController()
const signInController = new SignInController()

const authRouter = Router()
authRouter.post('/sign-up', signUpController.handle)
authRouter.post('/sign-in', signInController.handle)

export { authRouter }
