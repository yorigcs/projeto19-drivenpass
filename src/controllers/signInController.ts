import { Response, Request } from 'express'
import { Controller } from '../protocols'
import { signInSchema } from '../schemas'
import { signInService } from '../services'
import { ValidatorAdapter } from '../utils/validatorAdapter'

interface signInRequest extends Request {
  body: {
    email: string
    password: string
  }
}

export class SignInController implements Controller {
  async handle (req: signInRequest, res: Response): Promise<Response<any, Record<string, any>>> {
    const validatorAdapter = new ValidatorAdapter(signInSchema, req.body)
    const validResp = validatorAdapter.validate()
    if (validResp) {
      return res.status(validResp.statusCode).json(validResp.body)
    }

    const serviceResponse = await signInService(req.body)
    return res.status(serviceResponse.statusCode).json(serviceResponse.body)
  }
}
