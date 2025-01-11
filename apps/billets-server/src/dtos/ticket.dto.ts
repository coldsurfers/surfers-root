import { z } from 'zod'

export const TicketDTOSchema = z.object({
  id: z.string(),
  sellerName: z.string(),
  url: z.string(),
  openDate: z.string().datetime(),
})
export type TicketDTO = z.infer<typeof TicketDTOSchema>

export const GetTicketsByConcertIdParamsDTOSchema = z.object({
  concertId: z.string(),
})
export type GetTicketsByConcertIdParamsDTO = z.infer<typeof GetTicketsByConcertIdParamsDTOSchema>
