import { ArtistProfileImageDTOSchema } from '@/dtos/artist-profile-image.dto'
import {
  ArtistDTOSchema,
  GetArtistByIdParamsDTOSchema,
  GetConcertListByArtistIdParamsDTOSchema,
  GetConcertListByArtistIdQueryStringDTOSchema,
  SubscribeArtistBodyDTOSchema,
  UnsubscribeArtistBodyDTOSchema,
} from '@/dtos/artist.dto'
import { SignInBodyDTOSchema, SignUpBodyDTOSchema, UserWithAuthTokenDTOSchema } from '@/dtos/auth.dto'
import { GetSubscribeCommonParamsDTOSchema } from '@/dtos/common.dto'
import {
  ConcertDTOSchema,
  ConcertSearchQueryStringDTOSchema,
  GetConcertByIdParamsDTOSchema,
  GetConcertListQueryStringDTOSchema,
  GetSubscribedConcertListQueryStringDTOSchema,
  SubscribeConcertBodyDTOSchema,
  SubscribeConcertParamsDTOSchema,
} from '@/dtos/concert.dto'
import { CopyrightDTOSchema } from '@/dtos/copyright.dto'
import {
  ConfirmAuthCodeBodyDTOSchema,
  ConfirmAuthCodeResponseDTOSchema,
  SendAuthCodeResponseDTOSchema,
  SendEmailAuthCodeBodyDTOSchema,
} from '@/dtos/email-auth-request.dto'
import { ErrorResponseDTOSchema } from '@/dtos/error-response.dto'
import { FCMTokenDTOSchema, PostFCMTokenBodyDTOSchema } from '@/dtos/fcm-token.dto'
import {
  GetLocationConcertsQueryStringDTOSchema,
  LocationCityDTOSchema,
  LocationConcertDTOSchema,
  LocationCountryDTOSchema,
} from '@/dtos/location.dto'
import { SendEmailResponseDTOSchema, SendUserVoiceBodyDTOSchema } from '@/dtos/mailer.dto'
import { GetPostersByConcertIdParamsDTOSchema, PosterDTOSchema } from '@/dtos/poster.dto'
import { PriceDTOSchema } from '@/dtos/price.dto'
import { SearchListQueryStringDTOSchema } from '@/dtos/search.dto'
import { TicketDTOSchema } from '@/dtos/ticket.dto'
import { ActivateUserBodyDTOSchema, DeactivateUserBodyDTOSchema } from '@/dtos/user.dto'
import {
  GetConcertListByVenueIdParamsDTOSchema,
  GetConcertListByVenueIdQueryStringSchema,
  GetVenueByIdParamsDTOSchema,
  SubscribeVenueBodyDTOSchema,
  SubscribeVenueParamsDTOSchema,
  UnsubscribeVenueBodyDTOSchema,
} from '@/dtos/venue.dto'
import { SWAGGER_HOST } from '@/lib/constants'
import { jwtPlugin } from '@/plugins'
import artistProfileImageRoute from '@/routes/artist-profile-image.route'
import artistRoute from '@/routes/artist.route'
import authRoute from '@/routes/auth.route'
import concertRoute from '@/routes/concert.route'
import copyrightRoute from '@/routes/copyright.route'
import fcmRoute from '@/routes/fcm.route'
import locationRoute from '@/routes/location.route'
import mailerRoute from '@/routes/mailer.route'
import posterRoute from '@/routes/poster.route'
import priceRoute from '@/routes/price.route'
import searchRoute from '@/routes/search.route'
import subscribeRoute from '@/routes/subscribe.route'
import ticketRoute from '@/routes/ticket.route'
import userRoute from '@/routes/user.route'
import venueRoute from '@/routes/venue.route'
import cors from '@fastify/cors'
import rateLimit from '@fastify/rate-limit'
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUi from '@fastify/swagger-ui'
import dotenv from 'dotenv'
import Fastify from 'fastify'
import {
  createJsonSchemaTransformObject,
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod'

dotenv.config()

export const app = Fastify({
  logger: true,
})

app.register(cors, {
  allowedHeaders: ['Authorization', 'Content-Type'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  origin: ['http://localhost:3000', 'https://billets.coldsurf.io'],
})

app.register(jwtPlugin)

app.register(rateLimit, {
  global: false,
  // max: 100, // Maximum number of requests
  // timeWindow: '1 minute', // Time window in milliseconds or a human-readable format
  // keyGenerator: (req) => req.ip, // Generate a unique key based on the request IP
  // ban: 2, // Ban an IP if it exceeds the limit `ban` times
  // errorResponseBuilder: (req, context) => {
  //   return {
  //     statusCode: 429,
  //     error: 'Too Many Requests',
  //     message: `You have exceeded the request limit of ${context.max} per ${context.timeWindow}`,
  //   }
  // },
})

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(fastifySwagger, {
  swagger: {
    host: SWAGGER_HOST,
    schemes: ['http'],
    consumes: ['application/json'],
    produces: ['application/json'],
    securityDefinitions: {
      AccessTokenAuth: {
        type: 'apiKey',
        name: 'Authorization',
        in: 'header',
        description: 'Enter the access token, e.g. "<token>"',
      },
    },
  },
  transform: jsonSchemaTransform,
  openapi: {
    info: {
      title: 'ColdSurf API',
      description: 'App service ColdSurf server api docs',
      version: '1.0.0',
    },
    components: {
      securitySchemes: {
        AccessTokenAuth: {
          type: 'apiKey',
          name: 'Authorization',
          in: 'header',
        },
      },
    },
    tags: [
      {
        name: 'v1',
      },
      {
        name: 'auth',
      },
      {
        name: 'user',
      },
      {
        name: 'concert',
      },
      {
        name: 'artist',
      },
      {
        name: 'venue',
      },
      {
        name: 'fcm',
      },
      {
        name: 'search',
      },
    ],
  },
  transformObject: createJsonSchemaTransformObject({
    schemas: {
      ConcertDTOSchema,
      ArtistDTOSchema,
      ErrorResponseDTOSchema,
      SendEmailAuthCodeBodyDTOSchema,
      SendAuthCodeResponseDTOSchema,
      ConfirmAuthCodeBodyDTOSchema,
      ConfirmAuthCodeResponseDTOSchema,
      SignInBodyDTOSchema,
      SignUpBodyDTOSchema,
      UserWithAuthTokenDTOSchema,
      GetArtistByIdParamsDTOSchema,
      GetConcertListByArtistIdParamsDTOSchema,
      GetConcertListByArtistIdQueryStringDTOSchema,
      GetConcertByIdParamsDTOSchema,
      GetConcertListQueryStringDTOSchema,
      FCMTokenDTOSchema,
      PostFCMTokenBodyDTOSchema,
      LocationConcertDTOSchema,
      LocationCityDTOSchema,
      LocationCountryDTOSchema,
      GetLocationConcertsQueryStringDTOSchema,
      SendUserVoiceBodyDTOSchema,
      SendEmailResponseDTOSchema,
      SearchListQueryStringDTOSchema,
      GetSubscribedConcertListQueryStringDTOSchema,
      GetSubscribeCommonParamsDTOSchema,
      SubscribeConcertParamsDTOSchema,
      SubscribeConcertBodyDTOSchema,
      SubscribeArtistBodyDTOSchema,
      UnsubscribeArtistBodyDTOSchema,
      SubscribeVenueBodyDTOSchema,
      UnsubscribeVenueBodyDTOSchema,
      SubscribeVenueParamsDTOSchema,
      DeactivateUserBodyDTOSchema,
      ActivateUserBodyDTOSchema,
      GetVenueByIdParamsDTOSchema,
      GetConcertListByVenueIdParamsDTOSchema,
      GetConcertListByVenueIdQueryStringSchema,
      ConcertSearchQueryStringDTOSchema,
      PosterDTOSchema,
      GetPostersByConcertIdParamsDTOSchema,
      ArtistProfileImageDTOSchema,
      CopyrightDTOSchema,
      TicketDTOSchema,
      PriceDTOSchema,
    },
  }),
  // You can also create transform with custom skiplist of endpoints that should not be included in the specification:
  //
  // transform: createJsonSchemaTransform({
  //   skipList: [ '/documentation/static/*' ]
  // })
})

app.register(fastifySwaggerUi, {
  routePrefix: '/docs',
  uiConfig: {
    defaultModelsExpandDepth: 1, // Show schemas in the Models section
    // docExpansion: 'none', // Collapse all the docs by default
  },
  staticCSP: true,
  transformStaticCSP(header) {
    return header
  },
})

app.register(authRoute, { prefix: '/v1/auth' })
app.register(userRoute, { prefix: '/v1/user' })
app.register(concertRoute, { prefix: '/v1/concert' })
app.register(searchRoute, { prefix: '/v1/search' })
app.register(subscribeRoute, { prefix: '/v1/subscribe' })
app.register(fcmRoute, { prefix: '/v1/fcm' })
app.register(artistRoute, { prefix: '/v1/artist' })
app.register(venueRoute, { prefix: '/v1/venue' })
app.register(locationRoute, { prefix: '/v1/location' })
app.register(mailerRoute, { prefix: '/v1/mailer' })
app.register(posterRoute, { prefix: '/v1/poster' })
app.register(artistProfileImageRoute, { prefix: '/v1/artist-profile-image' })
app.register(copyrightRoute, { prefix: '/v1/copyright' })
app.register(ticketRoute, { prefix: '/v1/ticket' })
app.register(priceRoute, { prefix: '/v1/price' })
