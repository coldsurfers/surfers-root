import { JwtPayload } from 'jwt-decode'
import { z } from 'zod'

export interface FstvlLifeJwtPayload extends JwtPayload {
  id: string
}

export interface LatLng {
  latitude: number
  longitude: number
}

export const errorResponseSchema = z.object({
  code: z.string(),
  message: z.string(),
})

export type ErrorResponse = z.infer<typeof errorResponseSchema>
