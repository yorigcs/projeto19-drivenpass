import { ServerError } from '../errors/serverError'
import { HttpResponse } from '../protocols'

export const ok = (data: any): HttpResponse => ({
  statusCode: 200,
  body: data

})

export const created = (data: any): HttpResponse => ({
  statusCode: 201,
  body: data

})

export const badRequest = (data: any): HttpResponse => ({
  statusCode: 400,
  body: data

})

export const unauthorized = (data: any): HttpResponse => ({
  statusCode: 401,
  body: data

})

export const conflict = (data: any): HttpResponse => ({
  statusCode: 409,
  body: data

})

export const unprocessableEntity = (data: any): HttpResponse => ({
  statusCode: 422,
  body: data

})

export const serverError = (): HttpResponse => ({
  statusCode: 500,
  body: new ServerError()

})
