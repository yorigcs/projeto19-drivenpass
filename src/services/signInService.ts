import { InvalidParamError } from '../errors'
import { ok, badRequest, serverError, unauthorized } from '../helpers'
import { HttpResponse } from '../protocols'
import { findUserByEmail } from '../repositories'
import { TokenAdapter, EncrypterAdapter } from '../utils'

interface Data {
  email: string
  password: string
}

export const signInService = async (data: Data): Promise<HttpResponse> => {
  try {
    const user = await findUserByEmail(data.email)
    if (!user) {
      return badRequest(new InvalidParamError('Email or password is incorrect'))
    }
    const encrypterAdapter = new EncrypterAdapter(data.password)
    const isAuthorized = encrypterAdapter.decrypter(user.password)
    if (!isAuthorized) {
      return unauthorized(new InvalidParamError('Email or password is incorrect'))
    }
    const tokenAdapter = new TokenAdapter()
    const TOKEN = `Bearer ${tokenAdapter.generateToken(user)}`

    const userData = {
      userInfo: {
        user_id: user.id,
        email: user.email

      },
      token: TOKEN
    }

    return ok(userData)
  } catch (error) {
    return serverError()
  }
}
