export class ServerError extends Error {
  private readonly error: string
  constructor () {
    super('An internal error occurred, try again later')
    this.name = 'ServerError'
    this.error = 'An internal error occurred, try again later'
  }
}
