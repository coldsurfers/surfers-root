import { z } from 'zod'

export const LocationCountryDTOSchema = z.object({
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
export type LocationCountryDTO = z.infer<typeof LocationCountryDTOSchema>

export const LocationConcertDTOSchema = z.object({
  id: z.string(),
  title: z.string(),
  latitude: z.number(),
  longitude: z.number(),
})
export type LocationConcertDTO = z.infer<typeof LocationConcertDTOSchema>

export const LocationCityDTOSchema = z.object({
  id: z.string(),
  name: z.string(),
  uiName: z.string(),
  lat: z.number(),
  lng: z.number(),
  geohash: z.string().nullable(),
})
export type LocationCityDTO = z.infer<typeof LocationCityDTOSchema>
