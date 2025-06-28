import { ApolloServer } from '@apollo/server';
import { fastifyApolloDrainPlugin, fastifyApolloHandler } from '@as-integrations/fastify';
import cookie from '@fastify/cookie';
import cors from '@fastify/cors';
import Fastify from 'fastify';
import type { GraphqlContext } from '../gql/Context';
import resolvers from '../gql/resolvers';
import typeDefs from '../gql/type-defs';
import FileUploadController from '../routes/file-upload/file-upload.controller';

export async function startApp() {
  const fastify = Fastify({
    logger: process.env.NODE_ENV === 'development',
  });
  fastify.register(cors, {
    allowedHeaders: ['Authorization', 'Content-Type'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    origin: ['http://localhost:3000', 'https://wamuseum.coldsurf.io'],
  });

  fastify.register(cookie, {
    parseOptions: {
      sameSite: 'strict',
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      domain: process.env.NODE_ENV !== 'development' ? '.coldsurf.io' : undefined,
    },
  });

  fastify.route({
    url: '/api/presigned/artist-profile-images',
    method: ['OPTIONS', 'GET'],
    handler: FileUploadController.getArtistProfileImagesPresigned,
  });
  fastify.route({
    url: '/api/presigned/poster-thumbnails',
    method: ['OPTIONS', 'GET'],
    handler: FileUploadController.getPosterThumbnailsPresigned,
  });
  fastify.route({
    url: '/api/health-check',
    method: ['OPTIONS', 'GET'],
    handler: (_, rep) => {
      return rep.status(200).send({
        status: 'ok',
      });
    },
  });

  const apollo = new ApolloServer<GraphqlContext>({
    typeDefs,
    resolvers,
    plugins: [fastifyApolloDrainPlugin(fastify)],
    introspection: true,
  });

  await apollo.start();

  fastify.route({
    url: '/api/graphql',
    method: ['POST', 'OPTIONS', 'GET'],
    handler: fastifyApolloHandler(apollo, {
      context: async (request) => {
        /**
         * client side 에서 보낼때에는 request.cookies를 참조
         * server side 에서 보낼때에는 request.headers를 참조
         */
        return {
          token: request.cookies.accessToken ?? request.headers.authorization,
        };
      },
    }),
  });

  return fastify;
}
