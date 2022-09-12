import { Response, Request } from 'express'
import { Controller } from '../protocols'
import { credentialSearchService } from '../services'

interface createRequest extends Request {
  params: {
    credentialId?: string
  }
}

export class CredentialSearchController implements Controller {
  async handle (req: createRequest, res: Response): Promise<Response<any, Record<string, any>>> {
    let credentialId = parseInt(req.params.credentialId)
    if (isNaN(credentialId)) {
      credentialId = null
    }
    const { userId } = res.locals

    const serviceResponse = await credentialSearchService(credentialId, userId)
    return res.status(serviceResponse.statusCode).json(serviceResponse.body)
  }
}
