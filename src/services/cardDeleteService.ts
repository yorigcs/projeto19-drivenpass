import { InvalidParamError } from '../errors'
import { badRequest, serverError, ok, unauthorized } from '../helpers'
import { HttpResponse } from '../protocols'
import { deleteCard, findCardById } from '../repositories'

export const cardDeleteService = async (cardId: number, userId: number): Promise<HttpResponse> => {
  try {
    const card = await findCardById(cardId)
    if (!card) {
      return badRequest(new InvalidParamError('This card does not exist'))
    }
    if (card.user_id !== userId) {
      return unauthorized(new InvalidParamError('This card does not belong to you'))
    }

    await deleteCard(cardId)

    return ok('deleted')
  } catch (error) {
    return serverError()
  }
}
