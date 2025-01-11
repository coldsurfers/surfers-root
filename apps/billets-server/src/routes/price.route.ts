import { getPricesByTicketIdHandler } from '@/controllers/price.controller'
import { ErrorResponseDTOSchema } from '@/dtos/error-response.dto'
import { GetPricesByTicketIdParamsDTOSchema, PriceDTOSchema } from '@/dtos/price.dto'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { FastifyPluginCallback } from 'fastify/types/plugin'

const priceRoute: FastifyPluginCallback = (fastify, opts, done) => {
  fastify.withTypeProvider<ZodTypeProvider>().get(
    '/ticket/:ticketId',
    {
      schema: {
        tags: ['v1', 'price'],
        params: GetPricesByTicketIdParamsDTOSchema,
        response: {
          200: PriceDTOSchema.array(),
          500: ErrorResponseDTOSchema,
        },
      },
    },
    getPricesByTicketIdHandler,
  )
  done()
}

export default priceRoute
