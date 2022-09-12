import { InvalidParamError } from '../errors'
import { badRequest, serverError, ok, unauthorized } from '../helpers'
import { HttpResponse } from '../protocols'
import { findWifisByUserId, findWifiById } from '../repositories'
import { CryptrAdapter } from '../utils'

export const wifiSearchService = async (wifiId: number | null, userId: number): Promise<HttpResponse> => {
  try {
    const cryptrAdapter = new CryptrAdapter()
    if (!wifiId) {
      const wifis = await findWifisByUserId(userId)
      wifis.forEach(wifi => { wifi.password = cryptrAdapter.decrypt(wifi.password) })
      return ok(wifis)
    }

    const wifi = await findWifiById(wifiId)
    if (!wifi) {
      return badRequest(new InvalidParamError('This wifi does not exist'))
    }
    if (wifi.user_id !== userId) {
      return unauthorized(new InvalidParamError('This wifi does not belong to you'))
    }
    wifi.password = cryptrAdapter.decrypt(wifi.password)
    return ok(wifi)
  } catch (error) {
    return serverError()
  }
}
