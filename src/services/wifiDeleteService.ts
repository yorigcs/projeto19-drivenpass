import { InvalidParamError } from '../errors'
import { badRequest, serverError, ok, unauthorized } from '../helpers'
import { HttpResponse } from '../protocols'
import { deleteWifi, findWifiById } from '../repositories'

export const wifiDeleteService = async (wifiId: number, userId: number): Promise<HttpResponse> => {
  try {
    const wifi = await findWifiById(wifiId)
    if (!wifi) {
      return badRequest(new InvalidParamError('This wifi does not exist'))
    }
    if (wifi.user_id !== userId) {
      return unauthorized(new InvalidParamError('This wifi does not belong to you'))
    }

    await deleteWifi(wifiId)

    return ok('deleted')
  } catch (error) {
    return serverError()
  }
}
