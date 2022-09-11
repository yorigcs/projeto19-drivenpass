import { Response, Request } from 'express'
import { Controller } from '../protocols'
import { signUpSchema } from '../schemas'
import { signUpService } from '../services'
import { ValidatorAdapter } from '../utils/validatorAdapter'

interface signUpRequest extends Request {
  body: {
    email: string
    password: string
    confirmPassword: string
  }
}

export class SignUpController implements Controller {
  async handle (req: signUpRequest, res: Response): Promise<Response<any, Record<string, any>>> {
    const validatorAdapter = new ValidatorAdapter(signUpSchema, req.body)
    const validResp = validatorAdapter.validate()
    if (validResp) {
      return res.status(validResp.statusCode).json(validResp.body)
    }
    const serviceResponse = await signUpService(req.body)
    return res.status(serviceResponse.statusCode).json(serviceResponse.body)
  }
}
