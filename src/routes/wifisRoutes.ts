import { Router } from 'express'
import { AuthorizeUser } from '../middlewares/authorizeUser'
import { WifiCreateController } from '../controllers'
const authorizeUser = new AuthorizeUser()
const wifiCreateController = new WifiCreateController()

const wifisRoutes = Router()
wifisRoutes.post('/create-wifi', authorizeUser.handle, wifiCreateController.handle)

export { wifisRoutes }
