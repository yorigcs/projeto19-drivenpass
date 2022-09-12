import { Response, Request } from 'express'
import { Controller } from '../protocols'
import { noteSearchService } from '../services'

interface createRequest extends Request {
  params: {
    noteId?: string
  }
}

export class NoteSearchController implements Controller {
  async handle (req: createRequest, res: Response): Promise<Response<any, Record<string, any>>> {
    let noteId = parseInt(req.params.noteId)
    if (isNaN(noteId)) {
      noteId = null
    }
    const { userId } = res.locals

    const serviceResponse = await noteSearchService(noteId, userId)
    return res.status(serviceResponse.statusCode).json(serviceResponse.body)
  }
}
