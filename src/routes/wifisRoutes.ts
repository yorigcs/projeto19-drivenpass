import { Router } from 'express'
import { AuthorizeUser } from '../middlewares/authorizeUser'
import { WifiCreateController, WifiSearchController, WifiDeleteController } from '../controllers'

const authorizeUser = new AuthorizeUser()
const wifiCreateController = new WifiCreateController()
const wifiSearchController = new WifiSearchController()
const wifiDeleteController = new WifiDeleteController()
const wifisRoutes = Router()

wifisRoutes.post('/create-wifi', authorizeUser.handle, wifiCreateController.handle)
wifisRoutes.get('/wifis/:wifiId?', authorizeUser.handle, wifiSearchController.handle)
wifisRoutes.delete('/wifis/:wifiId', authorizeUser.handle, wifiDeleteController.handle)
export { wifisRoutes }
