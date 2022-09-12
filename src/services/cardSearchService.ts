import { InvalidParamError } from '../errors'
import { badRequest, serverError, ok, unauthorized } from '../helpers'
import { HttpResponse } from '../protocols'
import { findCardsByUserId, findCardById } from '../repositories'
import { CryptrAdapter } from '../utils'

export const cardSearchService = async (cardId: number | null, userId: number): Promise<HttpResponse> => {
  try {
    const cryptrAdapter = new CryptrAdapter()
    if (!cardId) {
      const cards = await findCardsByUserId(userId)
      cards.forEach(card => {
        card.password = cryptrAdapter.decrypt(card.password)
        card.cvc = cryptrAdapter.decrypt(card.cvc)
      })
      return ok(cards)
    }

    const card = await findCardById(cardId)
    if (!card) {
      return badRequest(new InvalidParamError('This card does not exist'))
    }
    if (card.user_id !== userId) {
      return unauthorized(new InvalidParamError('This card does not belong to you'))
    }
    card.password = cryptrAdapter.decrypt(card.password)
    card.cvc = cryptrAdapter.decrypt(card.cvc)
    return ok(card)
  } catch (error) {
    return serverError()
  }
}
