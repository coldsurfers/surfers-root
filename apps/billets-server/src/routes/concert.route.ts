import { concertHandler, concertListHandler, concertSearchHandler } from '@/controllers/concert.controller'
import {
  ConcertDTOSchema,
  ConcertSearchQueryStringDTOSchema,
  GetConcertByIdParamsDTOSchema,
  GetConcertListQueryStringDTOSchema,
} from '@/dtos/concert.dto'
import { ErrorResponseDTOSchema } from '@/dtos/error-response.dto'
import { FastifyPluginCallback } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'

const concertRoute: FastifyPluginCallback = (fastify, opts, done) => {
  // concert list
  fastify.withTypeProvider<ZodTypeProvider>().get(
    '/',
    {
      schema: {
        tags: ['v1', 'concert'],
        querystring: GetConcertListQueryStringDTOSchema,
        response: {
          200: ConcertDTOSchema.array(),
          500: ErrorResponseDTOSchema,
        },
      },
    },
    concertListHandler,
  )

  // concert
  fastify.withTypeProvider<ZodTypeProvider>().get(
    '/:id',
    {
      schema: {
        tags: ['v1', 'concert'],
        params: GetConcertByIdParamsDTOSchema,
        response: {
          200: ConcertDTOSchema,
          404: ErrorResponseDTOSchema,
          500: ErrorResponseDTOSchema,
        },
      },
    },
    concertHandler,
  )

  // concert search
  fastify.withTypeProvider<ZodTypeProvider>().get(
    '/search',
    {
      schema: {
        tags: ['v1', 'concert'],
        querystring: ConcertSearchQueryStringDTOSchema,
        response: {
          200: ConcertDTOSchema.array(),
        },
      },
    },
    concertSearchHandler,
  )

  done()
}

export default concertRoute
