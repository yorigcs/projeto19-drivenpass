import { InvalidParamError } from '../errors'
import { badRequest, created } from '../helpers'
import { HttpResponse } from '../protocols'
import { findUserByEmail, insertUserData, InsertUser } from '../repositories'
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

  const userData: InsertUser = {
    email: data.email,
    password: encrypterAdapter.encrypter()
  }

  await insertUserData(userData)
  return created(data)
}

const isValidPassword = (data: Data): boolean => {
  if (data.password !== data.confirmPassword || data.password.length < 10) {
    return false
  }
  return true
}
