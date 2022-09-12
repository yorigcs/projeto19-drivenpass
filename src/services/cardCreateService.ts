import { InvalidParamError } from '../errors'
import { badRequest, serverError, created } from '../helpers'
import { HttpResponse } from '../protocols'
import { findCardsByUserId, createCard, InsertCards } from '../repositories'
import { CryptrAdapter } from '../utils'

export type cardData = Omit<InsertCards, 'user_id'>

export const cardCreateService = async (data: InsertCards): Promise<HttpResponse> => {
  try {
    const cards = await findCardsByUserId(data.user_id)

    const hasTitle = cards.some(card => card.title === data.title)
    if (hasTitle) {
      return badRequest(new InvalidParamError('You already have a card with this title'))
    }
    const cryptrAdapter = new CryptrAdapter()
    data.password = cryptrAdapter.encrypt(data.password)
    data.cvc = cryptrAdapter.encrypt(data.cvc)

    await createCard(data)

    return created(data)
  } catch (error) {
    console.log(error)
    return serverError()
  }
}
