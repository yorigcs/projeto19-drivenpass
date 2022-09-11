import { prisma } from '../database/prismaConnection'
import { User } from '@prisma/client'

export type InsertUser = Omit<User, 'id'>

export const findUserByEmail = async (email: string): Promise<User> => {
  const user = await prisma.user.findFirst({
    where: {
      email
    }
  })
  return user
}

export const findUserById = async (id: number): Promise<User> => {
  const user = await prisma.user.findFirst({
    where: {
      id
    }
  })
  return user
}

export const insertUserData = async (data: InsertUser): Promise<void> => {
  await prisma.user.create({
    data
  })
}
