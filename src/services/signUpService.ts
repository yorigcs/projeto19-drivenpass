import { InvalidParamError } from '../errors'
import { badRequest, ok } from '../helpers'
import { HttpResponse } from '../protocols'
import { findUserByEmail } from '../repositories'

interface Data {
  email: string
  password: string
  confirmPassword: string
}
export const signUpService = async (data: Data): Promise<HttpResponse> => {
  const user = await findUserByEmail(data.email)
  if (user) {
    return badRequest(new InvalidParamError('This user is already registered'))
  }
  return ok('ok')
}
