import { Router } from 'express'
import { AuthorizeUser } from '../middlewares/authorizeUser'
import { CardDeleteController, CardsCreateController, CardSearchController } from '../controllers'
const authorizeUser = new AuthorizeUser()
const cardsCreateController = new CardsCreateController()
const cardSearchController = new CardSearchController()
const cardDeleteController = new CardDeleteController()
const cardsRoutes = Router()

cardsRoutes.post('/create-card', authorizeUser.handle, cardsCreateController.handle)
cardsRoutes.get('/cards/:cardId?', authorizeUser.handle, cardSearchController.handle)
cardsRoutes.delete('/cards/:cardId', authorizeUser.handle, cardDeleteController.handle)
export { cardsRoutes }
