import { z } from 'zod'

export const locationConcertDTOSerializedSchema = z.object({
  id: z.string(),
  title: z.string(),
  latitude: z.number(),
  longitude: z.number(),
})

export type LocationConcertDTOProps = {
  id: string
  title: string
  latitude: number
  longitude: number
}
