import { HttpResponse } from '../protocols'

export const badRequest = (data: any): HttpResponse => ({
  statusCode: 400,
  body: data

})

export const unprocessableEntity = (data: any): HttpResponse => ({
  statusCode: 422,
  body: data

})

export const ok = (data: any): HttpResponse => ({
  statusCode: 200,
  body: data

})
