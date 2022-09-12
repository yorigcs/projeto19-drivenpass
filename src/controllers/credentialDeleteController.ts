import { Response, Request } from 'express'
import { Controller } from '../protocols'
import { credentialDeleteService } from '../services'
import { deleteCredentialSchema } from '../schemas'
import { ValidatorAdapter } from '../utils/validatorAdapter'
interface createRequest extends Request {
  params: {
    credentialId: string
  }
}

export class CredentialDeleteController implements Controller {
  async handle (req: createRequest, res: Response): Promise<Response<any, Record<string, any>>> {
    const credentialId = parseInt(req.params.credentialId)

    const validatorAdapter = new ValidatorAdapter(deleteCredentialSchema, { credentialId })
    const validResp = validatorAdapter.validate()
    if (validResp) {
      return res.status(validResp.statusCode).json(validResp.body)
    }
    const { userId } = res.locals

    const serviceResponse = await credentialDeleteService(credentialId, userId)
    return res.status(serviceResponse.statusCode).json(serviceResponse.body)
  }
}
