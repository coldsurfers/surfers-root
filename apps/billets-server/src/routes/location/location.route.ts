import {
  getLocationCityListHandler,
  getLocationConcertsHandler,
  getLocationCountryListHandler,
} from '@/controllers/location.controller'
import { LocationCityDTOSchema, LocationConcertDTOSchema, LocationCountryDTOSchema } from '@/dtos/location.dto'
import { errorResponseSchema } from '@/lib/error'
import { FastifyPluginCallback } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { getLocationConcertsQueryStringSchema } from './location.types'

export const locationRoute: FastifyPluginCallback = (fastify, opts, done) => {
  fastify.withTypeProvider<ZodTypeProvider>().get(
    '/concert',
    {
      schema: {
        tags: ['v1', 'location'],
        querystring: getLocationConcertsQueryStringSchema,
        response: {
          200: LocationConcertDTOSchema.array(),
          400: errorResponseSchema,
          500: errorResponseSchema,
        },
      },
    },
    getLocationConcertsHandler,
  )

  fastify.withTypeProvider<ZodTypeProvider>().get(
    '/city',
    {
      schema: {
        tags: ['v1', 'location'],
        response: {
          200: LocationCityDTOSchema.array(),
          500: errorResponseSchema,
        },
      },
    },
    getLocationCityListHandler,
  )

  fastify.withTypeProvider<ZodTypeProvider>().get(
    '/country',
    {
      schema: {
        tags: ['v1', 'location'],
        response: {
          200: LocationCountryDTOSchema.array(),
          500: errorResponseSchema,
        },
      },
    },
    getLocationCountryListHandler,
  )

  done()
}
