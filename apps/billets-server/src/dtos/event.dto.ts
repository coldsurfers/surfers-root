import { z } from 'zod'
import { ConcertDetailDTOSchema, ConcertDTOSchema } from './concert.dto'

export const EventDTOSchema = z.discriminatedUnion('type', [
  z.object({
    type: z.literal('concert'),
    data: ConcertDTOSchema,
  }),
])
export type EventDTO = z.infer<typeof EventDTOSchema>

export const EventDetailDTOSchema = z.discriminatedUnion('type', [
  z.object({
    type: z.literal('concert'),
    data: ConcertDetailDTOSchema.extend({
      ticketPromotion: z
        .object({
          seller: z.string(),
          formattedPrice: z.string(),
        })
        .nullable(),
    }),
  }),
])
export type EventDetailDTO = z.infer<typeof EventDetailDTOSchema>

export const GetEventsQueryStringDTOSchema = z.object({
  offset: z.coerce.number().int().min(0).default(0),
  size: z.coerce.number().int().min(0).default(20),
  latitude: z.coerce.number().optional(),
  longitude: z.coerce.number().optional(),
})
export type GetEventsQueryStringDTO = z.infer<typeof GetEventsQueryStringDTOSchema>

export const GetEventDetailByIdParamsDTOSchema = z.object({
  eventId: z.string(),
})
export type GetEventDetailByIdParamsDTO = z.infer<typeof GetEventDetailByIdParamsDTOSchema>
