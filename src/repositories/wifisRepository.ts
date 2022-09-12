import { prisma } from '../database/prismaConnection'
import { Wifi } from '@prisma/client'

export type InsertWifi = Omit<Wifi, 'id' | 'created_at' | 'updated_at' >

export const findWifisByUserId = async (userId: number): Promise<Wifi []> => {
  const wifis = await prisma.wifi.findMany({
    where: {
      user_id: userId
    }
  })
  return wifis
}

export const findWifiById = async (wifiId: number): Promise<Wifi> => {
  const wifi = await prisma.wifi.findUnique({
    where: {
      id: wifiId
    }
  })
  return wifi
}

export const createWifi = async (data: InsertWifi): Promise<void> => {
  await prisma.wifi.create({
    data
  })
}

export const deleteWifi = async (wifiId: number): Promise<void> => {
  await prisma.wifi.delete({
    where: {
      id: wifiId
    }
  })
}
