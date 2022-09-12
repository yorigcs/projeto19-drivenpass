import { InvalidParamError } from '../errors'
import { badRequest, serverError, created } from '../helpers'
import { HttpResponse } from '../protocols'
import { findCredentialsByUserId, createCredential } from '../repositories'
import { CryptrAdapter } from '../utils'

interface Data {
  user_id: number
  title: string
  url: string
  username: string
  password: string
}

export const credentialCreateService = async (data: Data): Promise<HttpResponse> => {
  try {
    const credentials = await findCredentialsByUserId(data.user_id)

    const credentialsUrl = credentials.filter(credential => credential.url === data.url).length
    if (credentialsUrl === 2) {
      return badRequest(new InvalidParamError('This site already has two credentials'))
    }

    const hasTitle = credentials.some(credential => credential.title === data.title)
    if (hasTitle) {
      return badRequest(new InvalidParamError('You already have a title with this name'))
    }
    const cryptrAdapter = new CryptrAdapter()
    data.password = cryptrAdapter.encrypt(data.password)

    await createCredential(data)

    return created(data)
  } catch (error) {
    console.log(error)
    return serverError()
  }
}
