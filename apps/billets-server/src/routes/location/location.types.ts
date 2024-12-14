import { z } from 'zod'

export const getLocationConcertsQueryStringSchema = z.object({
  latitude: z.string(),
  longitude: z.string(),
  latitudeDelta: z.string(),
  longitudeDelta: z.string(),
  zoomLevel: z.string(),
})

export const getLocationConcertsQueryParsedSchema = z.object({
  latitude: z.number(),
  longitude: z.number(),
  latitudeDelta: z.number(),
  longitudeDelta: z.number(),
  zoomLevel: z.number(),
})
