import { FastifyPluginCallback } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { subscribedArtistDTOSerializedSchema } from '../dtos/SubscribeArtistDTO.types'
import {
  subscribeConcertDTOSerializedSchema,
  subscribedConcertDTOSerializedListSchema,
} from '../dtos/SubscribeConcertDTO.types'
import { subscribeVenueSerializedSchema } from '../dtos/SubscribeVenueDTO.types'
import { errorResponseSchema } from '../lib/error'
import {
  getConcertSubscribeHandler,
  getSubscribedConcertListHandler,
  subscribeArtistHandler,
  subscribeConcertHandler,
  subscribeVenueHandler,
  unsubscribeArtistHandler,
  unsubscribeConcertHandler,
  unsubscribeVenueHandler,
} from './subscribe.handler'
import {
  getSubscribedConcertListQueryStringSchema,
  subscribeConcertBodySchema,
  subscribeConcertParamsSchema,
  subscribeVenueParamsSchema,
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
        params: subscribeConcertParamsSchema,
        response: {
          200: subscribeConcertDTOSerializedSchema,
          401: errorResponseSchema,
          404: errorResponseSchema,
          500: errorResponseSchema,
        },
      },
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
  fastify.withTypeProvider<ZodTypeProvider>().post(
    '/artist/:id',
    {
      schema: {
        tags: ['v1', 'subscribe'],
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
  fastify.withTypeProvider<ZodTypeProvider>().post(
    '/venue/:id',
    {
      schema: {
        tags: ['v1', 'subscribe'],
        params: subscribeVenueParamsSchema,
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
