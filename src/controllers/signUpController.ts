import { Response, Request } from 'express'
import { Controller } from '../protocols'

export class SignUpController implements Controller {
  async handle (req: Request, res: Response): Promise<Response<any, Record<string, any>>> {
    return res.send('okay')
  }
}
