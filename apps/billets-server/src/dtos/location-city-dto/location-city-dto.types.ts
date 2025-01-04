import { z } from 'zod'

export const locationCityDTOSerializedSchema = z.object({
  id: z.string(),
  name: z.string(),
  uiName: z.string(),
  lat: z.number(),
  lng: z.number(),
  geohash: z.string().nullable(),
})
