import jwt from 'jsonwebtoken'
import { User } from '@prisma/client'
import dotenv from 'dotenv'
dotenv.config()

export class TokenAdapter {
  private readonly user: User
  private readonly SECRET = process.env.SECRET_JWT || 'secret@secret'
  private readonly EXP_TIME = process.env.EXP_JWT || '1d'
  constructor (user: User) {
    this.user = user
  }

  generateToken (): string {
    return jwt.sign(this.user, this.SECRET, { expiresIn: this.EXP_TIME })
  }
}
