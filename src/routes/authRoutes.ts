import { Router } from 'express'
import { SignUpController } from '../controllers'
const authRouter = Router()
const signUpController = new SignUpController()

authRouter.post('/sign-up', signUpController.handle)

export { authRouter }
