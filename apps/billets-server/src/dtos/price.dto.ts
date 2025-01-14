import { z } from 'zod'

export const PriceDTOSchema = z.object({
  id: z.string(),
  name: z.string(),
  price: z.number(),
  currency: z.string(),
})
export type PriceDTO = z.infer<typeof PriceDTOSchema>

export const GetPricesByTicketIdQueryStringDTOSchema = z.object({
  ticketId: z.string(),
})
export type GetPricesByTicketIdQueryStringDTO = z.infer<typeof GetPricesByTicketIdQueryStringDTOSchema>
