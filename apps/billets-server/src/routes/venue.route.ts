import {
  getConcertListByVenueIdHandler,
  getVenueByIdHandler,
  getVenuesByConcertIdHandler,
} from '@/controllers/venue.controller'
import { ConcertDTOSchema } from '@/dtos/concert.dto'
import { ErrorResponseDTOSchema } from '@/dtos/error-response.dto'
import {
  GetConcertListByVenueIdParamsDTOSchema,
  GetConcertListByVenueIdQueryStringSchema,
  GetVenueByIdParamsDTOSchema,
  GetVenuesByConcertIdParamsDTOSchema,
  VenueDTOSchema,
} from '@/dtos/venue.dto'
import { FastifyPluginCallback } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'

const venueRoute: FastifyPluginCallback = (fastify, opts, done) => {
  fastify.withTypeProvider<ZodTypeProvider>().get(
    '/:id',
    {
      schema: {
        tags: ['v1', 'venue'],
        params: GetVenueByIdParamsDTOSchema,
        response: {
          200: VenueDTOSchema,
          404: ErrorResponseDTOSchema,
          500: ErrorResponseDTOSchema,
        },
      },
    },
    getVenueByIdHandler,
  )
  fastify.withTypeProvider<ZodTypeProvider>().get(
    '/concert/:concertId',
    {
      schema: {
        tags: ['v1', 'venue'],
        params: GetVenuesByConcertIdParamsDTOSchema,
        response: {
          200: VenueDTOSchema.array(),
          500: ErrorResponseDTOSchema,
        },
      },
    },
    getVenuesByConcertIdHandler,
  )
  fastify.withTypeProvider<ZodTypeProvider>().get(
    '/concert-list/:venueId',
    {
      schema: {
        tags: ['v1', 'venue'],
        params: GetConcertListByVenueIdParamsDTOSchema,
        querystring: GetConcertListByVenueIdQueryStringSchema,
        response: {
          200: ConcertDTOSchema.array(),
          500: ErrorResponseDTOSchema,
        },
      },
    },
    getConcertListByVenueIdHandler,
  )
  done()
}

export default venueRoute
