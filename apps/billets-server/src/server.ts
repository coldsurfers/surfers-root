import { AppUpdateInfoDTOSchema } from '@/dtos/app-update-info.dto';
import { ArtistDetailDTOSchema } from '@/dtos/artist-detail.dto';
import { ArtistProfileImageDetailDTOSchema } from '@/dtos/artist-profile-image-detail.dto';
import { ArtistProfileImageDTOSchema } from '@/dtos/artist-profile-image.dto';
import { ArtistDTOSchema } from '@/dtos/artist.dto';
import { ReissueTokenBodyDTOSchema, UserWithAuthTokenDTOSchema } from '@/dtos/auth.dto';
import { ConcertDTOSchema, ConcertDetailDTOSchema } from '@/dtos/concert.dto';
import { CopyrightDTOSchema } from '@/dtos/copyright.dto';
import { DetailImageDTOSchema } from '@/dtos/detail-image.dto';
import {
  ConfirmAuthCodeResponseDTOSchema,
  SendAuthCodeResponseDTOSchema,
} from '@/dtos/email-auth-request.dto';
import { ErrorResponseDTOSchema } from '@/dtos/error-response.dto';
import { EventCategoryDTOSchema } from '@/dtos/event-category.dto';
import { EventDTOSchema, EventDetailDTOSchema } from '@/dtos/event.dto';
import { FCMTokenDTOSchema } from '@/dtos/fcm-token.dto';
import { UploadImageBodyDTOSchema, UploadImageResponseDTOSchema } from '@/dtos/image.dto';
import {
  LocationCityDTOSchema,
  LocationConcertDTOSchema,
  LocationCountryDTOSchema,
} from '@/dtos/location.dto';
import { SendEmailResponseDTOSchema, SendUserVoiceBodyDTOSchema } from '@/dtos/mailer.dto';
import { PosterDetailDTOSchema } from '@/dtos/poster-detail.dto';
import { PosterDTOSchema } from '@/dtos/poster.dto';
import { PriceDTOSchema } from '@/dtos/price.dto';
import {
  ArtistSubscribeDTOSchema,
  EventSubscribeDTOSchema,
  SubscribeInfoMeDTOSchema,
  VenueSubscribeDTOSchema,
} from '@/dtos/subscribe.dto';
import { TicketDTOSchema, TicketPromotionDTOSchema } from '@/dtos/ticket.dto';
import { UserDTOSchema, UserHandleDTOSchema } from '@/dtos/user.dto';
import { VenueDetailDTOSchema } from '@/dtos/venue-detail-dto';
import { GetVenueBySlugDTOSchema, VenueDTOSchema } from '@/dtos/venue.dto';
import { SWAGGER_HOST } from '@/lib/constants';
import { jwtPlugin } from '@/plugins';
import appRoute from '@/routes/app.route';
import artistProfileImageRoute from '@/routes/artist-profile-image.route';
import artistRoute from '@/routes/artist.route';
import authRoute from '@/routes/auth.route';
import eventCategoryRoute from '@/routes/event-category.route';
import eventRoute from '@/routes/event.route';
import fcmRoute from '@/routes/fcm.route';
import imageRoute from '@/routes/image.route';
import locationRoute from '@/routes/location.route';
import mailerRoute from '@/routes/mailer.route';
import posterRoute from '@/routes/poster.route';
import priceRoute from '@/routes/price.route';
import searchRoute from '@/routes/search.route';
import subscribeRoute from '@/routes/subscribe.route';
import ticketRoute from '@/routes/ticket.route';
import userRoute from '@/routes/user.route';
import venueRoute from '@/routes/venue.route';
import cors from '@fastify/cors';
import rateLimit from '@fastify/rate-limit';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';
import dotenv from 'dotenv';
import Fastify from 'fastify';
import {
  createJsonSchemaTransformObject,
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod';
import { RemoteAppManifestDTOSchema } from './dtos/remote-app-manifest.dto';
import {
  GetUserProfileByHandleParamsDTOSchema,
  UserProfileDTOSchema,
} from './dtos/user-profile.dto';

dotenv.config();

export const app = Fastify({
  logger: true,
});

app.register(cors, {
  origin: (origin, cb) => {
    if (!origin) {
      // 서버 간 요청 등 Origin이 없는 경우 허용
      cb(null, true);
      return;
    }

    const allowedBase = 'coldsurf.io';
    const url = new URL(origin);

    const isLocalHost = url.hostname === 'localhost' && url.port === '3000';

    if (isLocalHost) {
      cb(null, true);
    } else if (url.hostname === allowedBase || url.hostname.endsWith(`.${allowedBase}`)) {
      cb(null, true);
    } else {
      cb(new Error('Not allowed by CORS'), false);
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Authorization', 'Content-Type'],
});

app.register(jwtPlugin);

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
});

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

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
        name: 'event',
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
      ConcertDetailDTOSchema,
      ArtistDTOSchema,
      ErrorResponseDTOSchema,
      SendAuthCodeResponseDTOSchema,
      ConfirmAuthCodeResponseDTOSchema,
      UserWithAuthTokenDTOSchema,
      FCMTokenDTOSchema,
      LocationConcertDTOSchema,
      LocationCityDTOSchema,
      LocationCountryDTOSchema,
      SendEmailResponseDTOSchema,
      PosterDTOSchema,
      ArtistProfileImageDTOSchema,
      CopyrightDTOSchema,
      TicketDTOSchema,
      PriceDTOSchema,
      VenueDTOSchema,
      VenueDetailDTOSchema,
      UserDTOSchema,
      EventDTOSchema,
      EventDetailDTOSchema,
      TicketPromotionDTOSchema,
      ArtistDetailDTOSchema,
      PosterDetailDTOSchema,
      ArtistProfileImageDetailDTOSchema,
      EventSubscribeDTOSchema,
      ArtistSubscribeDTOSchema,
      VenueSubscribeDTOSchema,
      EventCategoryDTOSchema,
      SubscribeInfoMeDTOSchema,
      DetailImageDTOSchema,
      UploadImageBodyDTOSchema,
      UploadImageResponseDTOSchema,
      AppUpdateInfoDTOSchema,
      ReissueTokenBodyDTOSchema,
      UserHandleDTOSchema,
      UserProfileDTOSchema,
      GetUserProfileByHandleParamsDTOSchema,
      RemoteAppManifestDTOSchema,
      GetVenueBySlugDTOSchema,
      SendUserVoiceBodyDTOSchema,
    },
  }),
  // You can also create transform with custom skiplist of endpoints that should not be included in the specification:
  //
  // transform: createJsonSchemaTransform({
  //   skipList: [ '/documentation/static/*' ]
  // })
});

app.register(fastifySwaggerUi, {
  routePrefix: '/docs',
  uiConfig: {
    defaultModelsExpandDepth: 1, // Show schemas in the Models section
    // docExpansion: 'none', // Collapse all the docs by default
  },
  staticCSP: true,
  transformStaticCSP(header) {
    return header;
  },
});

app.register(authRoute, { prefix: '/v1/auth' });
app.register(userRoute, { prefix: '/v1/user' });
app.register(searchRoute, { prefix: '/v1/search' });
app.register(subscribeRoute, { prefix: '/v1/subscribe' });
app.register(fcmRoute, { prefix: '/v1/fcm' });
app.register(artistRoute, { prefix: '/v1/artist' });
app.register(venueRoute, { prefix: '/v1/venue' });
app.register(locationRoute, { prefix: '/v1/location' });
app.register(mailerRoute, { prefix: '/v1/mailer' });
app.register(posterRoute, { prefix: '/v1/poster' });
app.register(artistProfileImageRoute, { prefix: '/v1/artist-profile-image' });
app.register(ticketRoute, { prefix: '/v1/ticket' });
app.register(priceRoute, { prefix: '/v1/price' });
app.register(eventRoute, { prefix: '/v1/event' });
app.register(imageRoute, { prefix: '/v1/image' });
app.register(eventCategoryRoute, { prefix: '/v1/event-category' });
app.register(appRoute, { prefix: '/v1/app' });

console.log('Hello, this is billets-server');
