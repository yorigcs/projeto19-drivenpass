import jwt from 'jsonwebtoken'
import { User } from '@prisma/client'
import dotenv from 'dotenv'
dotenv.config()

interface Payload {
  id: string
  email: string
  iat: number
  exp: number
}

export class TokenAdapter {
  private readonly SECRET = process.env.SECRET_JWT || 'secret@secret'
  private readonly EXP_TIME = process.env.EXP_JWT || '1d'

  generateToken (user: User): string {
    return jwt.sign(user, this.SECRET, { expiresIn: this.EXP_TIME })
  }

  verifyToken (token: string): Payload | null {
    try {
      const decoded = jwt.verify(token, this.SECRET) as Payload
      return decoded
    } catch (error) {
      return null
    }
  }
}
