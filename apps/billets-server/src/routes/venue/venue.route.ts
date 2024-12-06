import { venueDTOSerializedSchema } from '@/dtos/VenueDTO.types'
import { FastifyPluginCallback } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { getConcertListByVenueIdRoute, getVenueByIdRoute } from './venue.handler'
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
          200: venueDTOSerializedSchema,
        },
      },
    },
    getVenueByIdRoute,
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
    getConcertListByVenueIdRoute,
  )
  done()
}
