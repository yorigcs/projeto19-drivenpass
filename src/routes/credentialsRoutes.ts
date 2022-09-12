import { Router } from 'express'
import { AuthorizeUser } from '../middlewares/authorizeUser'
import { CredentialCreateController } from '../controllers'

const authorizeUser = new AuthorizeUser()
const credentialCreateController = new CredentialCreateController()

const credentialRouter = Router()
credentialRouter.post('/create-credential', authorizeUser.handle, credentialCreateController.handle)

export { credentialRouter }
