import { getPricesByTicketIdHandler } from '@/controllers/price.controller'
import { ErrorResponseDTOSchema } from '@/dtos/error-response.dto'
import { GetPricesByTicketIdQueryStringDTOSchema, PriceDTOSchema } from '@/dtos/price.dto'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { FastifyPluginCallback } from 'fastify/types/plugin'

const priceRoute: FastifyPluginCallback = (fastify, opts, done) => {
  fastify.withTypeProvider<ZodTypeProvider>().get(
    '/',
    {
      schema: {
        tags: ['v1', 'price'],
        querystring: GetPricesByTicketIdQueryStringDTOSchema,
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
