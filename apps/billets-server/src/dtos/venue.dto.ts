import { z } from 'zod'

export const VenueDTOSchema = z.object({
  id: z.string(),
  name: z.string(),
  address: z.string(),
  lat: z.number(),
  lng: z.number(),
})
export type VenueDTO = z.infer<typeof VenueDTOSchema>
