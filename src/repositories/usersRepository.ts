import { prisma } from '../database/prismaConnection'
import { User } from '@prisma/client'

// type InsertUser = Omit<User, 'id'>

export const findUserByEmail = async (email: string): Promise<User> => {
  const user = await prisma.user.findFirst({
    where: {
      email
    }
  })
  return user
}
