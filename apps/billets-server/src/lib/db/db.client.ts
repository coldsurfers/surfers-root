import { PrismaClient } from '@prisma/client'

export const dbClient = new PrismaClient({
  log: ['warn', 'info', 'error'],
})

export async function connectDbClient() {
  await dbClient.$connect()
}

export async function disconnectDbClient() {
  await dbClient.$disconnect()
}
