import { Router } from 'express'
import { NoteCreateController } from '../controllers'
import { AuthorizeUser } from '../middlewares/authorizeUser'

const authorizeUser = new AuthorizeUser()
const noteCreateController = new NoteCreateController()
const notesRouter = Router()
notesRouter.post('/create-note', authorizeUser.handle, noteCreateController.handle)

export { notesRouter }
