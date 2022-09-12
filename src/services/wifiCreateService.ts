import { serverError, created } from '../helpers'
import { HttpResponse } from '../protocols'
import { createWifi, InsertWifi } from '../repositories'
import { CryptrAdapter } from '../utils'

export type wifiData = Omit<InsertWifi, 'user_id'>

export const wifiCreateService = async (data: InsertWifi): Promise<HttpResponse> => {
  try {
    const cryptrAdapter = new CryptrAdapter()
    data.password = cryptrAdapter.encrypt(data.password)

    await createWifi(data)

    return created(data)
  } catch (error) {
    console.log(error)
    return serverError()
  }
}
