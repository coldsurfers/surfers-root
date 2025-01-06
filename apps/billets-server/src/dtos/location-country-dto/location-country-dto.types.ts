import { z } from 'zod'

export const locationCountryDTOSerializedSchema = z.object({
  id: z.string(),
  name: z.string(),
  uiName: z.string(),
  cities: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      uiName: z.string(),
      lat: z.number(),
      lng: z.number(),
    }),
  ),
})
