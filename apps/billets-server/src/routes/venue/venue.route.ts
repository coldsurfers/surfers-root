import { getConcertListByVenueIdHandler, getVenueByIdHandler } from '@/controllers/venue.controller'
import { VenueDTOSchema } from '@/dtos/venue.dto'
import { FastifyPluginCallback } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import {
  getConcertListByVenueIdParamsSchema,
  getConcertListByVenueIdQueryStringSchema,
  getConcertListByVenueIdSuccessResponseSchema,
  getVenueByIdParamsSchema,
} from './venue.types'

export const venueRoute: FastifyPluginCallback = (fastify, opts, done) => {
  fastify.withTypeProvider<ZodTypeProvider>().get(
    '/:id',
    {
      schema: {
        tags: ['v1', 'venue'],
        params: getVenueByIdParamsSchema,
        response: {
          200: VenueDTOSchema,
        },
      },
    },
    getVenueByIdHandler,
  )
  fastify.withTypeProvider<ZodTypeProvider>().get(
    '/concert-list/:venueId',
    {
      schema: {
        tags: ['v1', 'venue'],
        params: getConcertListByVenueIdParamsSchema,
        querystring: getConcertListByVenueIdQueryStringSchema,
        response: {
          200: getConcertListByVenueIdSuccessResponseSchema,
        },
      },
    },
    getConcertListByVenueIdHandler,
  )
  done()
}
