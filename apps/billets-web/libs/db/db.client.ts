import { PrismaClient } from '@prisma/client'

export const dbClient = new PrismaClient({
  log: ['warn', 'info', 'error'],
})
