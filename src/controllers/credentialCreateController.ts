import { Response, Request } from 'express'
import { Controller } from '../protocols'
import { createCredentialSchema } from '../schemas'
import { credentialCreateService } from '../services'
import { ValidatorAdapter } from '../utils/validatorAdapter'

interface createRequest extends Request {
  body: {
    title: string
    url: string
    username: string
    password: string
  }
}

export class CredentialCreateController implements Controller {
  async handle (req: createRequest, res: Response): Promise<Response<any, Record<string, any>>> {
    const validatorAdapter = new ValidatorAdapter(createCredentialSchema, req.body)
    const validResp = validatorAdapter.validate()
    if (validResp) {
      return res.status(validResp.statusCode).json(validResp.body)
    }
    const { userId } = res.locals

    const credentialData = {
      ...req.body,
      user_id: userId
    }
    const serviceResponse = await credentialCreateService(credentialData)
    return res.status(serviceResponse.statusCode).json(serviceResponse.body)
  }
}
