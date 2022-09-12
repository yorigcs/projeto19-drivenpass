import { prisma } from '../database/prismaConnection'
import { Credential } from '@prisma/client'

export type InsertCredential = Omit<Credential, 'id' | 'created_at' | 'updated_at' >

export const findCredentialsByUserId = async (userId: number): Promise<Credential []> => {
  const credentials = await prisma.credential.findMany({
    where: {
      user_id: userId
    }
  })
  return credentials
}

export const createCredential = async (data: InsertCredential): Promise<void> => {
  await prisma.credential.create({
    data
  })
}
