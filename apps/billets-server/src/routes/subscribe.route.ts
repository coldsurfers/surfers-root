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
import { ArtistDTOSchema, SubscribeArtistBodyDTOSchema, UnsubscribeArtistBodyDTOSchema } from '@/dtos/artist.dto'
import { GetSubscribeCommonParamsDTOSchema } from '@/dtos/common.dto'
import {
  ConcertDTOSchema,
  GetSubscribedConcertListQueryStringDTOSchema,
  SubscribeConcertBodyDTOSchema,
  SubscribeConcertParamsDTOSchema,
} from '@/dtos/concert.dto'
import { ErrorResponseDTOSchema } from '@/dtos/error-response.dto'
import { SubscribeVenueBodyDTOSchema, UnsubscribeVenueBodyDTOSchema, VenueDTOSchema } from '@/dtos/venue.dto'
import { FastifyPluginCallback } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'

const subscribeRoute: FastifyPluginCallback = (fastify, opts, done) => {
  fastify.withTypeProvider<ZodTypeProvider>().get(
    '/concert',
    {
      schema: {
        tags: ['v1', 'subscribe'],
        querystring: GetSubscribedConcertListQueryStringDTOSchema,
        response: {
          200: ConcertDTOSchema.array(),
          401: ErrorResponseDTOSchema,
          500: ErrorResponseDTOSchema,
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
        params: GetSubscribeCommonParamsDTOSchema,
        response: {
          200: ConcertDTOSchema,
          401: ErrorResponseDTOSchema,
          404: ErrorResponseDTOSchema,
          500: ErrorResponseDTOSchema,
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
        params: SubscribeConcertParamsDTOSchema,
        body: SubscribeConcertBodyDTOSchema,
        response: {
          200: ConcertDTOSchema,
          401: ErrorResponseDTOSchema,
          404: ErrorResponseDTOSchema,
          500: ErrorResponseDTOSchema,
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
        params: SubscribeConcertParamsDTOSchema,
        body: SubscribeConcertBodyDTOSchema,
        response: {
          200: ConcertDTOSchema,
          401: ErrorResponseDTOSchema,
          404: ErrorResponseDTOSchema,
          500: ErrorResponseDTOSchema,
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
        params: GetSubscribeCommonParamsDTOSchema,
        response: {
          200: ArtistDTOSchema,
          401: ErrorResponseDTOSchema,
          404: ErrorResponseDTOSchema,
          500: ErrorResponseDTOSchema,
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
        body: SubscribeArtistBodyDTOSchema,
        response: {
          200: ArtistDTOSchema,
          401: ErrorResponseDTOSchema,
          404: ErrorResponseDTOSchema,
          500: ErrorResponseDTOSchema,
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
        body: UnsubscribeArtistBodyDTOSchema,
        response: {
          200: ArtistDTOSchema,
          401: ErrorResponseDTOSchema,
          404: ErrorResponseDTOSchema,
          500: ErrorResponseDTOSchema,
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
        params: GetSubscribeCommonParamsDTOSchema,
        response: {
          200: VenueDTOSchema,
          401: ErrorResponseDTOSchema,
          404: ErrorResponseDTOSchema,
          500: ErrorResponseDTOSchema,
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
        params: GetSubscribeCommonParamsDTOSchema,
        body: SubscribeVenueBodyDTOSchema,
        response: {
          200: VenueDTOSchema,
          401: ErrorResponseDTOSchema,
          404: ErrorResponseDTOSchema,
          500: ErrorResponseDTOSchema,
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
        params: GetSubscribeCommonParamsDTOSchema,
        body: UnsubscribeVenueBodyDTOSchema,
        response: {
          200: VenueDTOSchema,
          401: ErrorResponseDTOSchema,
          404: ErrorResponseDTOSchema,
          500: ErrorResponseDTOSchema,
        },
      },
      preHandler: [fastify.authenticate],
    },
    deleteUnsubscribeVenueHandler,
  )

  done()
}

export default subscribeRoute
