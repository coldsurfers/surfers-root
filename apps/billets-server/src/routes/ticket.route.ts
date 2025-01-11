import { getTicketsByConcertIdHandler } from '@/controllers/ticket.controller'
import { ErrorResponseDTOSchema } from '@/dtos/error-response.dto'
import { GetTicketsByConcertIdParamsDTOSchema, TicketDTOSchema } from '@/dtos/ticket.dto'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { FastifyPluginCallback } from 'fastify/types/plugin'

const ticketRoute: FastifyPluginCallback = (fastify, opts, done) => {
  fastify.withTypeProvider<ZodTypeProvider>().get(
    '/concert/:concertId',
    {
      schema: {
        tags: ['v1', 'ticket'],
        params: GetTicketsByConcertIdParamsDTOSchema,
        response: {
          200: TicketDTOSchema.array(),
          500: ErrorResponseDTOSchema,
        },
      },
    },
    getTicketsByConcertIdHandler,
  )
  done()
}

export default ticketRoute
