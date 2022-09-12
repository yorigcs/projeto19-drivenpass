import { Router } from 'express'
import { AuthorizeUser } from '../middlewares/authorizeUser'
import { CardsCreateController } from '../controllers'
const authorizeUser = new AuthorizeUser()
const cardsCreateController = new CardsCreateController()
const cardsRoutes = Router()
cardsRoutes.post('/create-card', authorizeUser.handle, cardsCreateController.handle)

export { cardsRoutes }
