import { InvalidParamError } from '../errors'
import { badRequest, serverError, created } from '../helpers'
import { HttpResponse } from '../protocols'
import { findNotesByUserId, createNote } from '../repositories'

interface Data {
  user_id: number
  title: string
  description: string
}

export const noteCreateService = async (data: Data): Promise<HttpResponse> => {
  try {
    if (data.title.length > 50) {
      return badRequest(new InvalidParamError('Title must have less than 50 characters'))
    }

    if (data.description.length > 1000) {
      return badRequest(new InvalidParamError('Description must have less than 1000 characters'))
    }

    const notes = await findNotesByUserId(data.user_id)

    const hasNote = notes.some(note => note.title === data.title)
    if (hasNote) {
      return badRequest(new InvalidParamError('You already have a note with this title'))
    }

    await createNote(data)

    return created(data)
  } catch (error) {
    return serverError()
  }
}
