import { Router } from 'express'
import { AuthorizeUser } from '../middlewares/authorizeUser'
import { WifiCreateController, WifiSearchController } from '../controllers'

const authorizeUser = new AuthorizeUser()
const wifiCreateController = new WifiCreateController()
const wifiSearchController = new WifiSearchController()

const wifisRoutes = Router()
wifisRoutes.post('/create-wifi', authorizeUser.handle, wifiCreateController.handle)
wifisRoutes.get('/wifis/:wifiId?', authorizeUser.handle, wifiSearchController.handle)
export { wifisRoutes }
