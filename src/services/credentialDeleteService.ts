import { InvalidParamError } from '../errors'
import { badRequest, serverError, ok, unauthorized } from '../helpers'
import { HttpResponse } from '../protocols'
import { deleteCredential, findCredentialById } from '../repositories'

export const credentialDeleteService = async (credentialId: number, userId: number): Promise<HttpResponse> => {
  try {
    const credential = await findCredentialById(credentialId)
    if (!credential) {
      return badRequest(new InvalidParamError('This credential does not exist'))
    }
    if (credential.user_id !== userId) {
      return unauthorized(new InvalidParamError('This credential does not belong to you'))
    }

    await deleteCredential(credentialId)

    return ok('deleted')
  } catch (error) {
    return serverError()
  }
}
