import { PrismaClient } from '@prisma/client'

export const prisma = new PrismaClient()

export async function connect() {
  await prisma.$connect()
}

export async function disconnect() {
  await prisma.$disconnect()
}
