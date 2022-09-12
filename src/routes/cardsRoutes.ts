import { Router } from 'express'
import { AuthorizeUser } from '../middlewares/authorizeUser'

const authorizeUser = new AuthorizeUser()

const cardsRoutes = Router()
cardsRoutes.post('/create-card', authorizeUser.handle)

export { cardsRoutes }
