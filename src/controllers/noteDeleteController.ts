import { Response, Request } from 'express'
import { Controller } from '../protocols'
import { noteDeleteService } from '../services'
import { deleteNoteSchema } from '../schemas'
import { ValidatorAdapter } from '../utils/validatorAdapter'
interface createRequest extends Request {
  params: {
    noteId: string
  }
}

export class NoteDeleteController implements Controller {
  async handle (req: createRequest, res: Response): Promise<Response<any, Record<string, any>>> {
    const noteId = parseInt(req.params.noteId)

    const validatorAdapter = new ValidatorAdapter(deleteNoteSchema, { noteId })
    const validResp = validatorAdapter.validate()
    if (validResp) {
      return res.status(validResp.statusCode).json(validResp.body)
    }
    const { userId } = res.locals

    const serviceResponse = await noteDeleteService(noteId, userId)
    return res.status(serviceResponse.statusCode).json(serviceResponse.body)
  }
}
