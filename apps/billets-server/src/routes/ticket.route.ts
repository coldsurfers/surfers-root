import { getTicketsByEventIdHandler } from '@/controllers/ticket.controller'
import { ErrorResponseDTOSchema } from '@/dtos/error-response.dto'
import { GetTicketsByEventIdQueryStringDTOSchema, TicketDTOSchema } from '@/dtos/ticket.dto'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { FastifyPluginCallback } from 'fastify/types/plugin'

const ticketRoute: FastifyPluginCallback = (fastify, opts, done) => {
  fastify.withTypeProvider<ZodTypeProvider>().get(
    '/',
    {
      schema: {
        tags: ['v1', 'ticket'],
        querystring: GetTicketsByEventIdQueryStringDTOSchema,
        response: {
          200: TicketDTOSchema.array(),
          500: ErrorResponseDTOSchema,
        },
      },
    },
    getTicketsByEventIdHandler,
  )
  done()
}

export default ticketRoute
