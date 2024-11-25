import cors from '@fastify/cors'
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
import { fcmTokenDTOSerializedSchema } from './dtos'
import { searchDTOSerializedSchema } from './dtos/SearchDTO.types'
import { subscribedArtistDTOSerializedSchema } from './dtos/SubscribeArtistDTO.types'
import {
  subscribeConcertDTOSerializedSchema,
  subscribedConcertDTOSerializedListSchema,
} from './dtos/SubscribeConcertDTO.types'
import { subscribeVenueSerializedSchema } from './dtos/SubscribeVenueDTO.types'
import { SWAGGER_HOST } from './lib/constants'
import { errorResponseSchema } from './lib/types'
import authRoute from './routes/auth.route'
import {
  confirmAuthCodeBodySchema,
  confirmAuthCodeResponseSchema,
  sendAuthCodeBodySchema,
  sendAuthCodeResponseSchema,
  signInBodySchema,
  signInResponseSchema,
  signUpBodySchema,
  signUpResponseSchema,
} from './routes/auth.types'
import concertRoute from './routes/concert.route'
import {
  concertDetailParamsSchema,
  concertDetailResponseSchema,
  concertListQueryStringSchema,
  concertListResponseSchema,
  concertSearchParamsSchema,
  concertSearchResponseSchema,
} from './routes/concert.types'
import { fcmRoute, postFCMTokenBodySchema } from './routes/fcm'
import searchRoute from './routes/search.route'
import { searchListQuerystringSchema } from './routes/search.types'
import subscribeRoute from './routes/subscribe.route'
import {
  getSubscribedConcertListQueryStringSchema,
  subscribeArtistParamsSchema,
  subscribeConcertBodySchema,
  subscribeConcertParamsSchema,
  subscribeVenueParamsSchema,
} from './routes/subscribe.types'
import userRoute from './routes/user.route'
import { getMeResponseSchema } from './routes/user.types'

dotenv.config()

export const fastify = Fastify({
  logger: true,
})

fastify.register(cors, {
  allowedHeaders: ['Authorization', 'Content-Type'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  origin: ['http://localhost:3000', 'https://coldsurf.io'],
})

fastify.setValidatorCompiler(validatorCompiler)
fastify.setSerializerCompiler(serializerCompiler)

fastify.register(fastifySwagger, {
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
    },
  }),
  // You can also create transform with custom skiplist of endpoints that should not be included in the specification:
  //
  // transform: createJsonSchemaTransform({
  //   skipList: [ '/documentation/static/*' ]
  // })
})

fastify.register(fastifySwaggerUi, {
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

fastify.register(authRoute, { prefix: '/v1/auth' })
fastify.register(userRoute, { prefix: '/v1/user' })
fastify.register(concertRoute, { prefix: '/v1/concert' })
fastify.register(searchRoute, { prefix: '/v1/search' })
fastify.register(subscribeRoute, { prefix: '/v1/subscribe' })
fastify.register(fcmRoute, { prefix: '/v1/fcm' })
