import {
  getArtistByIdHandler,
  getArtistsByConcertIdHandler,
  getConcertListByArtistIdHandler,
} from '@/controllers/artist.controller'
import {
  ArtistDTOSchema,
  GetArtistByIdParamsDTOSchema,
  GetArtistsByConcertIdParamsDTOSchema,
  GetConcertListByArtistIdParamsDTOSchema,
  GetConcertListByArtistIdQueryStringDTOSchema,
} from '@/dtos/artist.dto'
import { ConcertDTOSchema } from '@/dtos/concert.dto'
import { ErrorResponseDTOSchema } from '@/dtos/error-response.dto'
import { FastifyPluginCallback } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'

const artistRoute: FastifyPluginCallback = (fastify, opts, done) => {
  fastify.withTypeProvider<ZodTypeProvider>().get(
    '/:id',
    {
      schema: {
        tags: ['v1', 'artist'],
        params: GetArtistByIdParamsDTOSchema,
        response: {
          200: ArtistDTOSchema,
          404: ErrorResponseDTOSchema,
          500: ErrorResponseDTOSchema,
        },
      },
    },
    getArtistByIdHandler,
  )
  fastify.withTypeProvider<ZodTypeProvider>().get(
    '/concert/:concertId',
    {
      schema: {
        tags: ['v1', 'artist'],
        params: GetArtistsByConcertIdParamsDTOSchema,
        response: {
          200: ArtistDTOSchema.array(),
          500: ErrorResponseDTOSchema,
        },
      },
    },
    getArtistsByConcertIdHandler,
  )
  fastify.withTypeProvider<ZodTypeProvider>().get(
    '/concert-list/:artistId',
    {
      schema: {
        tags: ['v1', 'artist'],
        querystring: GetConcertListByArtistIdQueryStringDTOSchema,
        params: GetConcertListByArtistIdParamsDTOSchema,
        response: {
          200: ConcertDTOSchema.array(),
          500: ErrorResponseDTOSchema,
        },
      },
    },
    getConcertListByArtistIdHandler,
  )
  done()
}

export default artistRoute
