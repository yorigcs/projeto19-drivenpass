import { Response, Request } from 'express'
import { Controller } from '../protocols'
import { createCardSchema } from '../schemas'
import { cardCreateService, cardData } from '../services'
import { ValidatorAdapter } from '../utils/validatorAdapter'

interface createRequest extends Request {
  body: cardData
}

export class CardsCreateController implements Controller {
  async handle (req: createRequest, res: Response): Promise<Response<any, Record<string, any>>> {
    const validatorAdapter = new ValidatorAdapter(createCardSchema, req.body)
    const validResp = validatorAdapter.validate()
    if (validResp) {
      return res.status(validResp.statusCode).json(validResp.body)
    }
    const { userId } = res.locals

    const cardData = {
      ...req.body,
      user_id: userId
    }
    const serviceResponse = await cardCreateService(cardData)
    return res.status(serviceResponse.statusCode).json(serviceResponse.body)
  }
}
