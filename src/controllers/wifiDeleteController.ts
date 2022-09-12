import { Response, Request } from 'express'
import { Controller } from '../protocols'
import { wifiDeleteService } from '../services'
import { deleteWifiSchema } from '../schemas'
import { ValidatorAdapter } from '../utils/validatorAdapter'
interface createRequest extends Request {
  params: {
    wifiId: string
  }
}

export class WifiDeleteController implements Controller {
  async handle (req: createRequest, res: Response): Promise<Response<any, Record<string, any>>> {
    const wifiId = parseInt(req.params.wifiId)

    const validatorAdapter = new ValidatorAdapter(deleteWifiSchema, { wifiId })
    const validResp = validatorAdapter.validate()
    if (validResp) {
      return res.status(validResp.statusCode).json(validResp.body)
    }
    const { userId } = res.locals

    const serviceResponse = await wifiDeleteService(wifiId, userId)
    return res.status(serviceResponse.statusCode).json(serviceResponse.body)
  }
}
