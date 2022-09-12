import { Response, Request } from 'express'
import { Controller } from '../protocols'
import { noteSearchService } from '../services'

interface createRequest extends Request {
  params: {
    notedId?: string
  }
}

export class NoteSearchController implements Controller {
  async handle (req: createRequest, res: Response): Promise<Response<any, Record<string, any>>> {
    let notedId = parseInt(req.params.notedId)
    if (isNaN(notedId)) {
      notedId = null
    }
    const { userId } = res.locals

    const serviceResponse = await noteSearchService(notedId, userId)
    return res.status(serviceResponse.statusCode).json(serviceResponse.body)
  }
}
