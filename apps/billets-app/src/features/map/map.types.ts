import { z } from 'zod'

export const mapPointSchema = z.object({
  type: z.literal('Feature'),
  id: z.number(),
  originalId: z.string().uuid().optional(),
  properties: z.object({
    cluster: z.boolean().optional(),
    cluster_id: z.number().optional(),
    point_count: z.number().optional(),
    point_count_abbreviated: z.number().optional(),
  }),
  geometry: z.object({
    type: z.literal('Point'),
    coordinates: z.array(z.number()),
  }),
})
