import { prisma } from '../database/prismaConnection'
import { Notes } from '@prisma/client'

export type InsertNotes = Omit<Notes, 'id' | 'created_at' | 'updated_at' >

export const findNotesByUserId = async (userId: number): Promise<Notes []> => {
  const notes = await prisma.notes.findMany({
    where: {
      user_id: userId
    }
  })
  return notes
}

export const findNotesById = async (credentialId: number): Promise<Notes> => {
  const note = await prisma.notes.findUnique({
    where: {
      id: credentialId
    }
  })
  return note
}

export const createNote = async (data: InsertNotes): Promise<void> => {
  await prisma.notes.create({
    data
  })
}

export const deleteNote = async (credentialId: number): Promise<void> => {
  await prisma.notes.delete({
    where: {
      id: credentialId
    }
  })
}
