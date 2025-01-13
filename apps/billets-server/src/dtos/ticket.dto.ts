import { z } from 'zod'
import { PriceDTOSchema } from './price.dto'

export const TicketDTOSchema = z.object({
  id: z.string(),
  sellerName: z.string(),
  url: z.string(),
  openDate: z.string().datetime(),
  prices: PriceDTOSchema.array(),
})
export type TicketDTO = z.infer<typeof TicketDTOSchema>

export const GetTicketsByConcertIdParamsDTOSchema = z.object({
  concertId: z.string(),
})
export type GetTicketsByConcertIdParamsDTO = z.infer<typeof GetTicketsByConcertIdParamsDTOSchema>

export const TicketPromotionDTOSchema = TicketDTOSchema.omit({
  prices: true,
}).extend({
  price: PriceDTOSchema.nullable(),
})
export type TicketPromotionDTO = z.infer<typeof TicketPromotionDTOSchema>
