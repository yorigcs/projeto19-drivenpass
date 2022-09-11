import { Router } from 'express'
import { AuthorizeUser } from '../middlewares/authorizeUser'

const authorizeUser = new AuthorizeUser()

const credentialRouter = Router()
credentialRouter.post('/create-credential', authorizeUser.handle)

export { credentialRouter }
