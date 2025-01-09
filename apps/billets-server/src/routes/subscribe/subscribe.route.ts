import {
  deleteUnsubscribeArtistHandler,
  deleteUnsubscribeConcertHandler,
  deleteUnsubscribeVenueHandler,
  getArtistSubscribeHandler,
  getConcertSubscribeHandler,
  getSubscribedConcertListHandler,
  getVenueSubscribeHandler,
  postSubscribeArtistHandler,
  postSubscribeConcertHandler,
  postSubscribeVenueHandler,
} from '@/controllers/subscribe.controller'
import { subscribedArtistDTOSerializedSchema } from '@/dtos/subscribe-artist-dto/subscribe-artist-dto.types'
import {
  subscribeConcertDTOSerializedSchema,
  subscribedConcertDTOSerializedListSchema,
} from '@/dtos/subscribe-concert-dto/subscribe-concert-dto.types'
import { VenueDTOSchema } from '@/dtos/venue.dto'
import { errorResponseSchema } from '@/lib/error'
import { FastifyPluginCallback } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
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
      preHandler: [fastify.authenticate],
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
      preHandler: [fastify.authenticate],
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
      preHandler: [fastify.authenticate],
    },
    postSubscribeConcertHandler,
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
      preHandler: [fastify.authenticate],
    },
    deleteUnsubscribeConcertHandler,
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
      preHandler: [fastify.authenticate],
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
      preHandler: [fastify.authenticate],
    },
    postSubscribeArtistHandler,
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
      preHandler: [fastify.authenticate],
    },
    deleteUnsubscribeArtistHandler,
  )

  //  venue subscribe
  fastify.withTypeProvider<ZodTypeProvider>().get(
    '/venue/:id',
    {
      schema: {
        tags: ['v1', 'subscribe'],
        params: getSubscribeCommonParamsSchema,
        response: {
          200: VenueDTOSchema,
          401: errorResponseSchema,
          404: errorResponseSchema,
          500: errorResponseSchema,
        },
      },
      preHandler: [fastify.authenticate],
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
          200: VenueDTOSchema,
          401: errorResponseSchema,
          404: errorResponseSchema,
          500: errorResponseSchema,
        },
      },
      preHandler: [fastify.authenticate],
    },
    postSubscribeVenueHandler,
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
          200: VenueDTOSchema,
          401: errorResponseSchema,
          404: errorResponseSchema,
          500: errorResponseSchema,
        },
      },
      preHandler: [fastify.authenticate],
    },
    deleteUnsubscribeVenueHandler,
  )

  done()
}

export default subscribeRoute
