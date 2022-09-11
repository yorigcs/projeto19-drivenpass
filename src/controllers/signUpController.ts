import { Response, Request } from 'express'
import { Controller } from '../protocols'
import { signUpSchema } from '../schemas'
import { ValidatorAdapter } from '../utils/validatorAdapter'
export class SignUpController implements Controller {
  async handle (req: Request, res: Response): Promise<Response<any, Record<string, any>>> {
    const validatorAdapter = new ValidatorAdapter(signUpSchema, req.body)
    const validResp = validatorAdapter.validate()
    if (validResp) {
      return res.status(validResp.statusCode).json(validResp.body)
    }
    return res.send('okay')
  }
}
