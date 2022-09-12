import { Response, Request } from 'express'
import { Controller } from '../protocols'
import { cardDeleteService } from '../services'
import { deleteCardSchema } from '../schemas'
import { ValidatorAdapter } from '../utils/validatorAdapter'
interface createRequest extends Request {
  params: {
    cardId: string
  }
}

export class CardDeleteController implements Controller {
  async handle (req: createRequest, res: Response): Promise<Response<any, Record<string, any>>> {
    const cardId = parseInt(req.params.cardId)

    const validatorAdapter = new ValidatorAdapter(deleteCardSchema, { cardId })
    const validResp = validatorAdapter.validate()
    if (validResp) {
      return res.status(validResp.statusCode).json(validResp.body)
    }
    const { userId } = res.locals

    const serviceResponse = await cardDeleteService(cardId, userId)
    return res.status(serviceResponse.statusCode).json(serviceResponse.body)
  }
}
