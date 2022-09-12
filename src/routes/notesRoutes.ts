import { Router } from 'express'
import { NoteCreateController, NoteSearchController, NoteDeleteController } from '../controllers'
import { AuthorizeUser } from '../middlewares/authorizeUser'

const authorizeUser = new AuthorizeUser()
const noteCreateController = new NoteCreateController()
const noteSearchController = new NoteSearchController()
const noteDeleteController = new NoteDeleteController()

const notesRouter = Router()
notesRouter.post('/create-note', authorizeUser.handle, noteCreateController.handle)
notesRouter.get('/notes/:noteId?', authorizeUser.handle, noteSearchController.handle)
notesRouter.delete('/notes/:noteId', authorizeUser.handle, noteDeleteController.handle)

export { notesRouter }
