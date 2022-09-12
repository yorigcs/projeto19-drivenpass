import { prisma } from '../database/prismaConnection'
import { Cards } from '@prisma/client'

export type InsertCards = Omit<Cards, 'id' | 'created_at' | 'updated_at' >

export const findCardsByUserId = async (userId: number): Promise<Cards []> => {
  const cards = await prisma.cards.findMany({
    where: {
      user_id: userId
    }
  })
  return cards
}

export const findCardById = async (cardId: number): Promise<Cards> => {
  const card = await prisma.cards.findUnique({
    where: {
      id: cardId
    }
  })
  return card
}

export const createCard = async (data: InsertCards): Promise<void> => {
  await prisma.cards.create({
    data
  })
}

export const deleteCard = async (cardId: number): Promise<void> => {
  await prisma.cards.delete({
    where: {
      id: cardId
    }
  })
}
