import {
  deleteUnsubscribeArtistHandler,
  deleteUnsubscribeVenueHandler,
  getSubscribeInfoMeHandler,
  getSubscribedArtistHandler,
  getSubscribedArtistsHandler,
  getSubscribedEventHandler,
  getSubscribedEventsHandler,
  getSubscribedVenuesHandler,
  getVenueSubscribeHandler,
  postSubscribeArtistHandler,
  postSubscribeEventHandler,
  postSubscribeVenueHandler,
  unsubscribeEventHandler,
} from '@/controllers/subscribe.controller';
import { ErrorResponseDTOSchema } from '@/dtos/error-response.dto';
import {
  ArtistSubscribeDTOSchema,
  EventSubscribeDTOSchema,
  GetSubscribedArtistParamsDTOSchema,
  GetSubscribedEventByEventIdParamsDTOSchema,
  GetSubscribedQueryStringDTOSchema,
  GetSubscribedVenueParamsDTOSchema,
  SubscribeArtistBodyDTOSchema,
  SubscribeEventBodyDTOSchema,
  SubscribeInfoMeDTOSchema,
  SubscribeVenueBodyDTOSchema,
  UnsubscribeArtistBodyDTOSchema,
  UnsubscribeVenueBodyDTOSchema,
  VenueSubscribeDTOSchema,
} from '@/dtos/subscribe.dto';
import type { FastifyPluginCallback } from 'fastify';
import type { ZodTypeProvider } from 'fastify-type-provider-zod';

const subscribeRoute: FastifyPluginCallback = (fastify, _, done) => {
  fastify.withTypeProvider<ZodTypeProvider>().get(
    '/me',
    {
      schema: {
        tags: ['v1', 'subscribe'],
        response: {
          200: SubscribeInfoMeDTOSchema,
          401: ErrorResponseDTOSchema,
          500: ErrorResponseDTOSchema,
        },
        security: [
          {
            AccessTokenAuth: [],
          },
        ],
      },
      preHandler: [fastify.authenticate],
    },
    getSubscribeInfoMeHandler
  );
  fastify.withTypeProvider<ZodTypeProvider>().get(
    '/event',
    {
      schema: {
        tags: ['v1', 'subscribe'],
        querystring: GetSubscribedQueryStringDTOSchema,
        response: {
          200: EventSubscribeDTOSchema.array(),
          401: ErrorResponseDTOSchema,
          500: ErrorResponseDTOSchema,
        },
        security: [
          {
            AccessTokenAuth: [],
          },
        ],
      },
      preHandler: [fastify.authenticate],
    },
    getSubscribedEventsHandler
  );

  fastify.withTypeProvider<ZodTypeProvider>().get(
    '/artist',
    {
      schema: {
        tags: ['v1', 'subscribe'],
        querystring: GetSubscribedQueryStringDTOSchema,
        response: {
          200: ArtistSubscribeDTOSchema.array(),
          401: ErrorResponseDTOSchema,
          500: ErrorResponseDTOSchema,
        },
        security: [
          {
            AccessTokenAuth: [],
          },
        ],
      },
      preHandler: [fastify.authenticate],
    },
    getSubscribedArtistsHandler
  );
  fastify.withTypeProvider<ZodTypeProvider>().get(
    '/venue',
    {
      schema: {
        tags: ['v1', 'subscribe'],
        querystring: GetSubscribedQueryStringDTOSchema,
        response: {
          200: VenueSubscribeDTOSchema.array(),
          401: ErrorResponseDTOSchema,
          500: ErrorResponseDTOSchema,
        },
        security: [
          {
            AccessTokenAuth: [],
          },
        ],
      },
      preHandler: [fastify.authenticate],
    },
    getSubscribedVenuesHandler
  );

  fastify.withTypeProvider<ZodTypeProvider>().get(
    '/event/:eventId',
    {
      schema: {
        tags: ['v1', 'subscribe'],
        params: GetSubscribedEventByEventIdParamsDTOSchema,
        response: {
          200: EventSubscribeDTOSchema,
          401: ErrorResponseDTOSchema,
          404: ErrorResponseDTOSchema,
          500: ErrorResponseDTOSchema,
        },
        security: [
          {
            AccessTokenAuth: [],
          },
        ],
      },
      preHandler: [fastify.authenticate],
    },
    getSubscribedEventHandler
  );

  fastify.withTypeProvider<ZodTypeProvider>().post(
    '/event',
    {
      schema: {
        tags: ['v1', 'subscribe'],
        body: SubscribeEventBodyDTOSchema,
        response: {
          200: EventSubscribeDTOSchema,
          401: ErrorResponseDTOSchema,
          404: ErrorResponseDTOSchema,
          500: ErrorResponseDTOSchema,
        },
        security: [
          {
            AccessTokenAuth: [],
          },
        ],
      },
      preHandler: [fastify.authenticate],
    },
    postSubscribeEventHandler
  );

  fastify.withTypeProvider<ZodTypeProvider>().delete(
    '/event',
    {
      schema: {
        tags: ['v1', 'subscribe'],
        body: SubscribeEventBodyDTOSchema,
        response: {
          200: EventSubscribeDTOSchema,
          401: ErrorResponseDTOSchema,
          404: ErrorResponseDTOSchema,
          500: ErrorResponseDTOSchema,
        },
        security: [
          {
            AccessTokenAuth: [],
          },
        ],
      },
      preHandler: [fastify.authenticate],
    },
    unsubscribeEventHandler
  );

  // artist subscribe
  fastify.withTypeProvider<ZodTypeProvider>().get(
    '/artist/:artistId',
    {
      schema: {
        tags: ['v1', 'subscribe'],
        params: GetSubscribedArtistParamsDTOSchema,
        response: {
          200: ArtistSubscribeDTOSchema,
          401: ErrorResponseDTOSchema,
          404: ErrorResponseDTOSchema,
          500: ErrorResponseDTOSchema,
        },
        security: [
          {
            AccessTokenAuth: [],
          },
        ],
      },
      preHandler: [fastify.authenticate],
    },
    getSubscribedArtistHandler
  );
  fastify.withTypeProvider<ZodTypeProvider>().post(
    '/artist',
    {
      schema: {
        tags: ['v1', 'subscribe'],
        body: SubscribeArtistBodyDTOSchema,
        response: {
          200: ArtistSubscribeDTOSchema,
          401: ErrorResponseDTOSchema,
          404: ErrorResponseDTOSchema,
          500: ErrorResponseDTOSchema,
        },
        security: [
          {
            AccessTokenAuth: [],
          },
        ],
      },
      preHandler: [fastify.authenticate],
    },
    postSubscribeArtistHandler
  );

  // artist unsubscribe
  fastify.withTypeProvider<ZodTypeProvider>().delete(
    '/artist',
    {
      schema: {
        tags: ['v1', 'subscribe'],
        body: UnsubscribeArtistBodyDTOSchema,
        response: {
          200: ArtistSubscribeDTOSchema,
          401: ErrorResponseDTOSchema,
          404: ErrorResponseDTOSchema,
          500: ErrorResponseDTOSchema,
        },
        security: [
          {
            AccessTokenAuth: [],
          },
        ],
      },
      preHandler: [fastify.authenticate],
    },
    deleteUnsubscribeArtistHandler
  );

  //  venue subscribe
  fastify.withTypeProvider<ZodTypeProvider>().get(
    '/venue/:venueId',
    {
      schema: {
        tags: ['v1', 'subscribe'],
        params: GetSubscribedVenueParamsDTOSchema,
        response: {
          200: VenueSubscribeDTOSchema,
          401: ErrorResponseDTOSchema,
          404: ErrorResponseDTOSchema,
          500: ErrorResponseDTOSchema,
        },
        security: [
          {
            AccessTokenAuth: [],
          },
        ],
      },
      preHandler: [fastify.authenticate],
    },
    getVenueSubscribeHandler
  );
  fastify.withTypeProvider<ZodTypeProvider>().post(
    '/venue',
    {
      schema: {
        tags: ['v1', 'subscribe'],
        body: SubscribeVenueBodyDTOSchema,
        response: {
          200: VenueSubscribeDTOSchema,
          401: ErrorResponseDTOSchema,
          404: ErrorResponseDTOSchema,
          500: ErrorResponseDTOSchema,
        },
        security: [
          {
            AccessTokenAuth: [],
          },
        ],
      },
      preHandler: [fastify.authenticate],
    },
    postSubscribeVenueHandler
  );

  // venue unsubscribe
  fastify.withTypeProvider<ZodTypeProvider>().delete(
    '/venue',
    {
      schema: {
        tags: ['v1', 'subscribe'],
        body: UnsubscribeVenueBodyDTOSchema,
        response: {
          200: VenueSubscribeDTOSchema,
          401: ErrorResponseDTOSchema,
          404: ErrorResponseDTOSchema,
          500: ErrorResponseDTOSchema,
        },
        security: [
          {
            AccessTokenAuth: [],
          },
        ],
      },
      preHandler: [fastify.authenticate],
    },
    deleteUnsubscribeVenueHandler
  );

  done();
};

export default subscribeRoute;
