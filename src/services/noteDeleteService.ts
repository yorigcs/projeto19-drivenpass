import { InvalidParamError } from '../errors'
import { badRequest, serverError, ok, unauthorized } from '../helpers'
import { HttpResponse } from '../protocols'
import { deleteNote, findNotesById } from '../repositories'

export const noteDeleteService = async (noteId: number, userId: number): Promise<HttpResponse> => {
  try {
    const credential = await findNotesById(noteId)
    if (!credential) {
      return badRequest(new InvalidParamError('This note does not exist'))
    }
    if (credential.user_id !== userId) {
      return unauthorized(new InvalidParamError('This note does not belong to you'))
    }

    await deleteNote(noteId)

    return ok('deleted')
  } catch (error) {
    return serverError()
  }
}
