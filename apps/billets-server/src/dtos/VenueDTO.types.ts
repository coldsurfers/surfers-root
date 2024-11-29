import { Venue } from '@prisma/client'
import { z } from 'zod'

export type VenueDTOProps = Partial<Venue>
export const venueDTOSerializedSchema = z.object({
  id: z.string(),
  title: z.string(),
})
