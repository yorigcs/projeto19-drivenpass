import { Router } from 'express'
import { NoteCreateController, NoteSearchController } from '../controllers'
import { AuthorizeUser } from '../middlewares/authorizeUser'

const authorizeUser = new AuthorizeUser()
const noteCreateController = new NoteCreateController()
const noteSearchController = new NoteSearchController()
const notesRouter = Router()
notesRouter.post('/create-note', authorizeUser.handle, noteCreateController.handle)
notesRouter.get('/notes/:notedId?', authorizeUser.handle, noteSearchController.handle)

export { notesRouter }
