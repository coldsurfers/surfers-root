import { FastifyPluginCallback } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { venueDTOSerializedSchema } from '../../dtos/VenueDTO.types'
import { getConcertListByVenueIdRoute, getVenueByIdRoute } from './venue.handler'
import { getConcertListByVenueIdParamsSchema, getVenueByIdParamsSchema } from './venue.types'

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
      },
    },
    getConcertListByVenueIdRoute,
  )
  done()
}
