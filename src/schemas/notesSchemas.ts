import Joi from 'joi'

export const createNoteSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required()

})

export const deleteNoteSchema = Joi.object({
  noteId: Joi.number().required()
})
