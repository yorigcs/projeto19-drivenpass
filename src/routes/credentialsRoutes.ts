import { Router } from 'express'
import { AuthorizeUser } from '../middlewares/authorizeUser'
import { CredentialCreateController, CredentialSearchController } from '../controllers'

const authorizeUser = new AuthorizeUser()
const credentialCreateController = new CredentialCreateController()
const credentialSearchController = new CredentialSearchController()

const credentialRouter = Router()
credentialRouter.post('/create-credential', authorizeUser.handle, credentialCreateController.handle)
credentialRouter.get('/credentials/:credentialId?', authorizeUser.handle, credentialSearchController.handle)

export { credentialRouter }
