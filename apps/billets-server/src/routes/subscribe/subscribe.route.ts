import { subscribedArtistDTOSerializedSchema } from '@/dtos/subscribe-artist-dto/subscribe-artist-dto.types'
import {
  subscribeConcertDTOSerializedSchema,
  subscribedConcertDTOSerializedListSchema,
} from '@/dtos/subscribe-concert-dto/subscribe-concert-dto.types'
import { subscribeVenueSerializedSchema } from '@/dtos/subscribe-venue-dto/subscribe-venue-dto.types'
import { errorResponseSchema } from '@/lib/error'
import { FastifyPluginCallback } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import {
  getArtistSubscribeHandler,
  getConcertSubscribeHandler,
  getSubscribedConcertListHandler,
  getSubscribePreHandler,
  getVenueSubscribeHandler,
  subscribeArtistHandler,
  subscribeConcertHandler,
  subscribeVenueHandler,
  unsubscribeArtistHandler,
  unsubscribeConcertHandler,
  unsubscribeVenueHandler,
} from './subscribe.handler'
import {
  getSubscribeCommonParamsSchema,
  getSubscribedConcertListQueryStringSchema,
  subscribeArtistBodySchema,
  subscribeConcertBodySchema,
  subscribeConcertParamsSchema,
  subscribeVenueBodySchema,
  subscribeVenueParamsSchema,
  unsubscribeArtistBodySchema,
  unsubscribeVenueBodySchema,
} from './subscribe.types'

const subscribeRoute: FastifyPluginCallback = (fastify, opts, done) => {
  fastify.withTypeProvider<ZodTypeProvider>().get(
    '/concert',
    {
      schema: {
        tags: ['v1', 'subscribe'],
        querystring: getSubscribedConcertListQueryStringSchema,
        response: {
          200: subscribedConcertDTOSerializedListSchema,
          401: errorResponseSchema,
          500: errorResponseSchema,
        },
      },
    },
    getSubscribedConcertListHandler,
  )

  fastify.withTypeProvider<ZodTypeProvider>().get(
    '/concert/:id',
    {
      schema: {
        tags: ['v1', 'subscribe'],
        params: getSubscribeCommonParamsSchema,
        response: {
          200: subscribeConcertDTOSerializedSchema,
          401: errorResponseSchema,
          404: errorResponseSchema,
          500: errorResponseSchema,
        },
      },
      preHandler: getSubscribePreHandler,
    },
    getConcertSubscribeHandler,
  )
  // concert subscribe
  fastify.withTypeProvider<ZodTypeProvider>().post(
    '/concert/:id',
    {
      schema: {
        tags: ['v1', 'subscribe'],
        params: subscribeConcertParamsSchema,
        body: subscribeConcertBodySchema,
        response: {
          200: subscribeConcertDTOSerializedSchema,
          401: errorResponseSchema,
          404: errorResponseSchema,
          500: errorResponseSchema,
        },
      },
    },
    subscribeConcertHandler,
  )

  // concert unsubscribe
  fastify.withTypeProvider<ZodTypeProvider>().delete(
    '/concert/:id',
    {
      schema: {
        tags: ['v1', 'subscribe'],
        params: subscribeConcertParamsSchema,
        body: subscribeConcertBodySchema,
        response: {
          200: subscribeConcertDTOSerializedSchema,
          401: errorResponseSchema,
          404: errorResponseSchema,
          500: errorResponseSchema,
        },
      },
    },
    unsubscribeConcertHandler,
  )

  // artist subscribe
  fastify.withTypeProvider<ZodTypeProvider>().get(
    '/artist/:id',
    {
      schema: {
        tags: ['v1', 'subscribe'],
        params: getSubscribeCommonParamsSchema,
        response: {
          200: subscribedArtistDTOSerializedSchema,
          401: errorResponseSchema,
          404: errorResponseSchema,
          500: errorResponseSchema,
        },
      },
      preHandler: getSubscribePreHandler,
    },
    getArtistSubscribeHandler,
  )
  fastify.withTypeProvider<ZodTypeProvider>().post(
    '/artist/:id',
    {
      schema: {
        tags: ['v1', 'subscribe'],
        body: subscribeArtistBodySchema,
        response: {
          200: subscribedArtistDTOSerializedSchema,
          401: errorResponseSchema,
          404: errorResponseSchema,
          500: errorResponseSchema,
        },
      },
    },
    subscribeArtistHandler,
  )

  // artist unsubscribe
  fastify.withTypeProvider<ZodTypeProvider>().delete(
    '/artist/:id',
    {
      schema: {
        tags: ['v1', 'subscribe'],
        body: unsubscribeArtistBodySchema,
        response: {
          200: subscribedArtistDTOSerializedSchema,
          401: errorResponseSchema,
          404: errorResponseSchema,
          500: errorResponseSchema,
        },
      },
    },
    unsubscribeArtistHandler,
  )

  //  venue subscribe
  fastify.withTypeProvider<ZodTypeProvider>().get(
    '/venue/:id',
    {
      schema: {
        tags: ['v1', 'subscribe'],
        params: getSubscribeCommonParamsSchema,
        response: {
          200: subscribeVenueSerializedSchema,
          401: errorResponseSchema,
          404: errorResponseSchema,
          500: errorResponseSchema,
        },
      },
      preHandler: getSubscribePreHandler,
    },
    getVenueSubscribeHandler,
  )
  fastify.withTypeProvider<ZodTypeProvider>().post(
    '/venue/:id',
    {
      schema: {
        tags: ['v1', 'subscribe'],
        params: subscribeVenueParamsSchema,
        body: subscribeVenueBodySchema,
        response: {
          200: subscribeVenueSerializedSchema,
          401: errorResponseSchema,
          404: errorResponseSchema,
          500: errorResponseSchema,
        },
      },
    },
    subscribeVenueHandler,
  )

  // venue unsubscribe
  fastify.withTypeProvider<ZodTypeProvider>().delete(
    '/venue/:id',
    {
      schema: {
        tags: ['v1', 'subscribe'],
        params: subscribeVenueParamsSchema,
        body: unsubscribeVenueBodySchema,
        response: {
          200: subscribeVenueSerializedSchema,
          401: errorResponseSchema,
          404: errorResponseSchema,
          500: errorResponseSchema,
        },
      },
    },
    unsubscribeVenueHandler,
  )

  done()
}

export default subscribeRoute
