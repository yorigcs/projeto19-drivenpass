export class InvalidParamError extends Error {
  private readonly error: string
  constructor (msg: string) {
    super(msg)
    this.name = 'InvalidParamError'
    this.error = `${msg}`
  }
}
