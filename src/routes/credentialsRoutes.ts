import { Router } from 'express'
import { AuthorizeUser } from '../middlewares/authorizeUser'
import { CredentialCreateController, CredentialSearchController, CredentialDeleteController } from '../controllers'

const authorizeUser = new AuthorizeUser()
const credentialCreateController = new CredentialCreateController()
const credentialSearchController = new CredentialSearchController()
const credentialDeleteController = new CredentialDeleteController()

const credentialRouter = Router()
credentialRouter.post('/create-credential', authorizeUser.handle, credentialCreateController.handle)
credentialRouter.get('/credentials/:credentialId?', authorizeUser.handle, credentialSearchController.handle)
credentialRouter.delete('/credentials/:credentialId', authorizeUser.handle, credentialDeleteController.handle)
export { credentialRouter }
