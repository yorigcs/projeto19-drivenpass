import Cryptr from 'cryptr'
import dotenv from 'dotenv'
dotenv.config()

const SECRET = process.env.CRYPTER_SECRET || 'secret@secret'

export class CryptrAdapter extends Cryptr {
  constructor () {
    super(SECRET)
  }
}
