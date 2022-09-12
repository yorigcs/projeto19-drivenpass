import { InvalidParamError } from '../errors'
import { badRequest, serverError, ok, unauthorized } from '../helpers'
import { HttpResponse } from '../protocols'
import { findNotesById, findNotesByUserId } from '../repositories'

export const noteSearchService = async (noteId: number | null, userId: number): Promise<HttpResponse> => {
  try {
    if (!noteId) {
      const notes = await findNotesByUserId(userId)

      return ok(notes)
    }

    const note = await findNotesById(noteId)
    if (!note) {
      return badRequest(new InvalidParamError('This note does not exist'))
    }
    if (note.user_id !== userId) {
      return unauthorized(new InvalidParamError('This note does not belong to you'))
    }

    return ok(note)
  } catch (error) {
    return serverError()
  }
}
