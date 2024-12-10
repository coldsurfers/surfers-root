import { PrismaClient } from '@prisma/client'

export const prisma = new PrismaClient({
  log: ['warn', 'info', 'error'],
})

export async function connect() {
  await prisma.$connect()
}

export async function disconnect() {
  await prisma.$disconnect()
}
