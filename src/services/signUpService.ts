import { InvalidParamError } from '../errors'
import { badRequest, ok } from '../helpers'
import { HttpResponse } from '../protocols'
import { findUserByEmail } from '../repositories'
import { EncrypterAdapter } from '../utils'

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

  if (!isValidPassword(data)) {
    return badRequest(new InvalidParamError('The passwords must be equal and have at least 10 characters'))
  }

  const encrypterAdapter = new EncrypterAdapter(data.password)
  data.password = encrypterAdapter.encrypter()
  return ok(data)
}

const isValidPassword = (data: Data): boolean => {
  if (data.password !== data.confirmPassword || data.password.length < 10) {
    return false
  }
  return true
}
