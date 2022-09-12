import BaseJoi from 'joi'
import JoiDate from '@joi/date'
const Joi = BaseJoi.extend(JoiDate)

export const createCardSchema = Joi.object({
  number: Joi.string().required(),
  name: Joi.string().required(),
  cvc: Joi.string().required(),
  expirate: Joi.date().format('MM/YY').required(),
  password: Joi.string().required(),
  is_virtual: Joi.boolean().required(),
  type: Joi.string().valid('CREDIT', 'DEBIT', 'BOTH').required(),
  title: Joi.string().required()
})

export const deleteCardSchema = Joi.object({
  credentialId: Joi.number().required()
})
