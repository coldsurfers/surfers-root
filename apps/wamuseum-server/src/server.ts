import { ApolloServer } from '@apollo/server'
import { fastifyApolloDrainPlugin, fastifyApolloHandler } from '@as-integrations/fastify'
import cookie from '@fastify/cookie'
import cors from '@fastify/cors'
import Fastify from 'fastify'
import { GraphqlContext } from '../gql/Context'
import resolvers from '../gql/resolvers'
import typeDefs from '../gql/type-defs'
import FileUploadController from '../routes/file-upload/file-upload.controller'

export const fastify = Fastify({
  logger: process.env.NODE_ENV === 'development',
})

fastify.register(
  async (instance, opts, done) => {
    const apollo = new ApolloServer<GraphqlContext>({
      typeDefs,
      resolvers,
      plugins: [fastifyApolloDrainPlugin(fastify)],
      introspection: process.env.NODE_ENV === 'development',
    })
    await apollo.start()
    await instance.register(cors, {
      allowedHeaders: ['Authorization', 'Content-Type'],
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      origin: ['http://localhost:3000', 'https://wamuseum.coldsurf.io'],
    })

    await instance.register(cookie)

    await instance.route({
      url: '/graphql',
      method: ['POST', 'OPTIONS', 'GET'],
      handler: fastifyApolloHandler(apollo, {
        context: async (request) => {
          /**
           * client side 에서 보낼때에는 request.cookies를 참조
           * server side 에서 보낼때에는 request.headers를 참조
           */
          return {
            token: request.cookies.accessToken ?? request.headers.authorization,
          }
        },
      }),
    })
    await instance.route({
      url: '/presigned/artist-profile-images',
      method: ['OPTIONS', 'GET'],
      handler: FileUploadController.getArtistProfileImagesPresigned,
    })
    await instance.route({
      url: '/presigned/poster-thumbnails',
      method: ['OPTIONS', 'GET'],
      handler: FileUploadController.getPosterThumbnailsPresigned,
    })
    done()
  },
  {
    prefix: '/api',
  },
)
