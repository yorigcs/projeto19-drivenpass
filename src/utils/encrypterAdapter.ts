import bcrypt from 'bcrypt'

export class EncrypterAdapter {
  private readonly password: string
  private readonly SALT = 10
  constructor (password: string) {
    this.password = password
  }

  encrypter (): string {
    return bcrypt.hashSync(this.password, this.SALT)
  }

  decrypter (encryptedPassword: string): boolean {
    return bcrypt.compareSync(this.password, encryptedPassword)
  }
}
