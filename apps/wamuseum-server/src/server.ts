import { ApolloServer } from '@apollo/server'
import { fastifyApolloDrainPlugin, fastifyApolloHandler } from '@as-integrations/fastify'
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
    })
    await apollo.start()
    await fastify.register(cors)

    await instance.route({
      url: '/graphql',
      method: ['POST', 'OPTIONS', 'GET'],
      handler: fastifyApolloHandler(apollo, {
        context: async (args) => ({
          token: args.headers.authorization,
        }),
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
