import { Response, Request } from 'express'
import { Controller } from '../protocols'
import { cardSearchService } from '../services'

interface createRequest extends Request {
  params: {
    cardId?: string
  }
}

export class CardSearchController implements Controller {
  async handle (req: createRequest, res: Response): Promise<Response<any, Record<string, any>>> {
    let cardId = parseInt(req.params.cardId)
    if (isNaN(cardId)) {
      cardId = null
    }
    const { userId } = res.locals

    const serviceResponse = await cardSearchService(cardId, userId)
    return res.status(serviceResponse.statusCode).json(serviceResponse.body)
  }
}
