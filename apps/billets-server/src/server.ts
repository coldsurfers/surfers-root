import { fcmTokenDTOSerializedSchema } from '@/dtos/fcm-token-dto'
import { searchDTOSerializedSchema } from '@/dtos/search-dto/search-dto.types'
import { subscribedArtistDTOSerializedSchema } from '@/dtos/subscribe-artist-dto/subscribe-artist-dto.types'
import {
  subscribeConcertDTOSerializedSchema,
  subscribedConcertDTOSerializedListSchema,
} from '@/dtos/subscribe-concert-dto/subscribe-concert-dto.types'
import { subscribeVenueSerializedSchema } from '@/dtos/subscribe-venue-dto/subscribe-venue-dto.types'
import { venueDTOSerializedSchema } from '@/dtos/venue-dto/venue-dto.types'
import authRoute from '@/routes/auth/auth.route'
import {
  confirmAuthCodeBodySchema,
  confirmAuthCodeResponseSchema,
  sendAuthCodeBodySchema,
  sendAuthCodeResponseSchema,
  signInBodySchema,
  signInResponseSchema,
  signUpBodySchema,
  signUpResponseSchema,
} from '@/routes/auth/auth.types'
import concertRoute from '@/routes/concert/concert.route'
import {
  concertDetailParamsSchema,
  concertDetailResponseSchema,
  concertListQueryStringSchema,
  concertListResponseSchema,
  concertSearchParamsSchema,
  concertSearchResponseSchema,
} from '@/routes/concert/concert.types'
import searchRoute from '@/routes/search/search.route'
import { searchListQuerystringSchema } from '@/routes/search/search.types'
import subscribeRoute from '@/routes/subscribe/subscribe.route'
import userRoute from '@/routes/user/user.route'
import { activateUserBodySchema, deactivateUserBodySchema, getMeResponseSchema } from '@/routes/user/user.types'
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
import { ArtistDTOSchema } from './dtos/artist.dto'
import { locationCityDTOSerializedSchema } from './dtos/location-city-dto'
import { locationConcertDTOSerializedSchema } from './dtos/location-concert-dto'
import { locationCountryDTOSerializedSchema } from './dtos/location-country-dto'
import { SWAGGER_HOST } from './lib/constants'
import { errorResponseSchema } from './lib/error'
import { jwtPlugin } from './plugins'
import { artistRoute } from './routes/artist'
import {
  getArtistByIdParamsSchema,
  getConcertListByArtistIdParamsSchema,
  getConcertListByArtistIdQueryStringSchema,
  getConcertListByArtistIdSuccessResponseSchema,
} from './routes/artist/artist.types'
import { fcmRoute, postFCMTokenBodySchema } from './routes/fcm'
import { locationRoute } from './routes/location/location.route'
import { getLocationConcertsQueryStringSchema } from './routes/location/location.types'
import { mailerRoute } from './routes/mailer/mailer.route'
import { sendEmailResponseSchema, sendUserVoiceBodySchema } from './routes/mailer/mailer.types'
import {
  getSubscribeCommonParamsSchema,
  getSubscribedConcertListQueryStringSchema,
  subscribeArtistBodySchema,
  subscribeArtistParamsSchema,
  subscribeConcertBodySchema,
  subscribeConcertParamsSchema,
  subscribeVenueBodySchema,
  subscribeVenueParamsSchema,
  unsubscribeArtistBodySchema,
  unsubscribeVenueBodySchema,
} from './routes/subscribe/subscribe.types'
import {
  getConcertListByVenueIdParamsSchema,
  getConcertListByVenueIdQueryStringSchema,
  getConcertListByVenueIdSuccessResponseSchema,
  getVenueByIdParamsSchema,
  venueRoute,
} from './routes/venue'

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
    ],
  },
  transformObject: createJsonSchemaTransformObject({
    schemas: {
      SignInBody: signInBodySchema,
      SignInSuccessResponse: signInResponseSchema,
      SendAuthCodeBody: sendAuthCodeBodySchema,
      SendAuthCodeSuccessResponse: sendAuthCodeResponseSchema,
      SignUpBody: signUpBodySchema,
      SignUpSuccessResponse: signUpResponseSchema,
      GetMeSuccessResponse: getMeResponseSchema,
      ConcertListQueryString: concertListQueryStringSchema,
      ConcertListSuccessResponse: concertListResponseSchema,
      ConcertDetailParams: concertDetailParamsSchema,
      ConcertDetailSuccessResponse: concertDetailResponseSchema,
      ConcertSearchParams: concertSearchParamsSchema,
      ConcertSearchSuccessResponse: concertSearchResponseSchema,
      ConfirmAuthCodeBody: confirmAuthCodeBodySchema,
      ConfirmAuthCodeSuccessResponse: confirmAuthCodeResponseSchema,
      ErrorResponse: errorResponseSchema,
      SearchListQuerystring: searchListQuerystringSchema,
      SearchDTOSerialized: searchDTOSerializedSchema,
      SubscribeConcertDTOSerialized: subscribeConcertDTOSerializedSchema,
      SubscribeConcertParams: subscribeConcertParamsSchema,
      SubscribedArtistDTOSerialized: subscribedArtistDTOSerializedSchema,
      SubscribeArtistParams: subscribeArtistParamsSchema,
      SubscribeVenueParams: subscribeVenueParamsSchema,
      SubscribeVenueSerialized: subscribeVenueSerializedSchema,
      SubscribeConcertBody: subscribeConcertBodySchema,
      GetSubscribedConcertListQueryString: getSubscribedConcertListQueryStringSchema,
      SubscribedConcertSerializedList: subscribedConcertDTOSerializedListSchema,
      PostFCMTokenBody: postFCMTokenBodySchema,
      PostFCMTokenSuccessResponse: fcmTokenDTOSerializedSchema,
      GetArtistByIdParams: getArtistByIdParamsSchema,
      GetArtistByIdSuccessResponse: ArtistDTOSchema,
      GetVenueByIdParams: getVenueByIdParamsSchema,
      GetVenueByIdSuccessResponse: venueDTOSerializedSchema,
      GetConcertListByVenueIdParams: getConcertListByVenueIdParamsSchema,
      GetConcertListByVenueIdQuerystring: getConcertListByVenueIdQueryStringSchema,
      GetConcertListByVenueIdSuccessResponse: getConcertListByVenueIdSuccessResponseSchema,
      DeactivateUserBody: deactivateUserBodySchema,
      ActivateUserBody: activateUserBodySchema,
      GetConcertListByArtistIdParams: getConcertListByArtistIdParamsSchema,
      GetConcertListByArtistIdQuerystring: getConcertListByArtistIdQueryStringSchema,
      GetConcertListByArtistIdSuccessResponse: getConcertListByArtistIdSuccessResponseSchema,
      GetSubscribeCommonParams: getSubscribeCommonParamsSchema,
      SubscribeVenueBody: subscribeVenueBodySchema,
      SubscribeArtistBody: subscribeArtistBodySchema,
      UnsubscribeVenueBody: unsubscribeVenueBodySchema,
      UnsubscribeArtistBody: unsubscribeArtistBodySchema,
      GetLocationConcertsQueryString: getLocationConcertsQueryStringSchema,
      LocationConcertDTOSerialized: locationConcertDTOSerializedSchema,
      LocationCityDTOSerialized: locationCityDTOSerializedSchema,
      LocationCountryDTOSerialized: locationCountryDTOSerializedSchema,
      SendUserVoiceBody: sendUserVoiceBodySchema,
      SendEmailResponse: sendEmailResponseSchema,
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
