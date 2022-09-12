import { InvalidParamError } from '../errors'
import { badRequest, serverError, ok, unauthorized } from '../helpers'
import { HttpResponse } from '../protocols'
import { findCredentialsByUserId, findCredentialById } from '../repositories'
import { CryptrAdapter } from '../utils'

export const credentialSearchService = async (credentialId: number | null, userId: number): Promise<HttpResponse> => {
  try {
    const cryptrAdapter = new CryptrAdapter()
    if (!credentialId) {
      const credentials = await findCredentialsByUserId(userId)
      credentials.forEach(credential => { credential.password = cryptrAdapter.decrypt(credential.password) })
      return ok(credentials)
    }

    const credential = await findCredentialById(credentialId)
    if (!credential) {
      return badRequest(new InvalidParamError('This credential does not exist'))
    }
    if (credential.user_id !== userId) {
      return unauthorized(new InvalidParamError('This credential does not belong to you'))
    }
    credential.password = cryptrAdapter.decrypt(credential.password)
    return ok(credential)
  } catch (error) {
    return serverError()
  }
}
