import { Response, Request } from 'express'
import { Controller } from '../protocols'
import { wifiSearchService } from '../services'

interface createRequest extends Request {
  params: {
    wifiId?: string
  }
}

export class WifiSearchController implements Controller {
  async handle (req: createRequest, res: Response): Promise<Response<any, Record<string, any>>> {
    let wifiId = parseInt(req.params.wifiId)
    if (isNaN(wifiId)) {
      wifiId = null
    }
    const { userId } = res.locals

    const serviceResponse = await wifiSearchService(wifiId, userId)
    return res.status(serviceResponse.statusCode).json(serviceResponse.body)
  }
}
