import { getArtistByIdHandler, getConcertListByArtistIdHandler } from '@/controllers/artist.controller'
import { artistDTOSerializedSchema } from '@/dtos/artist-dto/artist-dto.types'
import { errorResponseSchema } from '@/lib/error'
import { FastifyPluginCallback } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import {
  getArtistByIdParamsSchema,
  getConcertListByArtistIdParamsSchema,
  getConcertListByArtistIdQueryStringSchema,
  getConcertListByArtistIdSuccessResponseSchema,
} from './artist.types'

export const artistRoute: FastifyPluginCallback = (fastify, opts, done) => {
  fastify.withTypeProvider<ZodTypeProvider>().get(
    '/:id',
    {
      schema: {
        tags: ['v1', 'artist'],
        params: getArtistByIdParamsSchema,
        response: {
          200: artistDTOSerializedSchema,
          404: errorResponseSchema,
          500: errorResponseSchema,
        },
      },
    },
    getArtistByIdHandler,
  )
  fastify.withTypeProvider<ZodTypeProvider>().get(
    '/concert-list/:artistId',
    {
      schema: {
        tags: ['v1', 'artist'],
        querystring: getConcertListByArtistIdQueryStringSchema,
        params: getConcertListByArtistIdParamsSchema,
        response: {
          200: getConcertListByArtistIdSuccessResponseSchema,
          500: errorResponseSchema,
        },
      },
    },
    getConcertListByArtistIdHandler,
  )
  done()
}
