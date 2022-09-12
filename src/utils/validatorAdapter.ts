import Joi from 'joi'
import { InvalidParamError } from '../errors'
import { unprocessableEntity } from '../helpers'
import { HttpResponse } from '../protocols'

interface Data {
  [key: string]: any
}
export class ValidatorAdapter {
  private readonly schema: Joi.ObjectSchema
  private readonly data: Data

  constructor (schema: Joi.ObjectSchema, data: Data) {
    this.schema = schema
    this.data = data
  }

  validate (): HttpResponse {
    const { error } = this.schema.validate(this.data, { abortEarly: false })
    if (error) {
      return unprocessableEntity(new InvalidParamError(error.message))
    }
  }
}
