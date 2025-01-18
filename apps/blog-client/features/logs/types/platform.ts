import { z } from 'zod'

export const logPlatformSchema = z.union([
  z.literal('techlog'),
  z.literal('filmlog'),
  z.literal('soundlog'),
  z.literal('squarelog'),
  z.literal('textlog'),
])
export type LogPlatform = z.infer<typeof logPlatformSchema>
