import Joi from 'joi'

export const createWifiSchema = Joi.object({
  name: Joi.string().required(),
  title: Joi.string().required(),
  password: Joi.string().required()
})

export const deleteWifiSchema = Joi.object({
  credentialId: Joi.number().required()
})
