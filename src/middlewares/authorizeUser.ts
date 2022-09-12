import { Response, Request, NextFunction } from 'express'
import { TokenAdapter } from '../utils'

interface JwtRequest extends Request {
  headers: {
    authorization: string
  }
}

export class AuthorizeUser {
  async handle (req: JwtRequest, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>> {
    const token = req.headers.authorization?.replace('Bearer ', '')
    if (!token) {
      return res.status(422).send('Must provide a token')
    }
    const tokenAdapter = new TokenAdapter()
    const decoded = tokenAdapter.verifyToken(token)
    if (!decoded) {
      return res.status(401).send('Invalid Token')
    }
    res.locals.userId = decoded.id
    next()
  }
}
