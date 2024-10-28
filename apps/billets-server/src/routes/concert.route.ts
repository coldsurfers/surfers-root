import { FastifyPluginCallback } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { concertHandler, concertListHandler, concertSearchHandler } from './concert.handler'
import {
  concertDetailParamsSchema,
  concertDetailResponseSchema,
  concertListQueryStringSchema,
  concertListResponseSchema,
  concertSearchParamsSchema,
  concertSearchResponseSchema,
} from './concert.types'

const concertRoute: FastifyPluginCallback = (fastify, opts, done) => {
  // concert list
  fastify.withTypeProvider<ZodTypeProvider>().get(
    '/',
    {
      schema: {
        tags: ['v1', 'concert'],
        querystring: concertListQueryStringSchema,
        response: {
          200: concertListResponseSchema,
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
        params: concertDetailParamsSchema,
        response: {
          200: concertDetailResponseSchema,
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
        querystring: concertSearchParamsSchema,
        response: {
          200: concertSearchResponseSchema,
        },
      },
    },
    concertSearchHandler,
  )

  done()
}

export default concertRoute
