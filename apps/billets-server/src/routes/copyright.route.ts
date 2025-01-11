import { getCopyrightByArtistProfileImageIdHandler } from '@/controllers/copyright.controller'
import { CopyrightDTOSchema, GetCopyrightByArtistProfileImageIdParamsDTOSchema } from '@/dtos/copyright.dto'
import { ErrorResponseDTOSchema } from '@/dtos/error-response.dto'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { FastifyPluginCallback } from 'fastify/types/plugin'

const copyrightRoute: FastifyPluginCallback = (fastify, opts, done) => {
  fastify.withTypeProvider<ZodTypeProvider>().get(
    '/artist-profile-image/:artistProfileImageId',
    {
      schema: {
        tags: ['v1', 'copyright'],
        params: GetCopyrightByArtistProfileImageIdParamsDTOSchema,
        response: {
          200: CopyrightDTOSchema.nullable(),
          500: ErrorResponseDTOSchema,
        },
      },
    },
    getCopyrightByArtistProfileImageIdHandler,
  )
  done()
}

export default copyrightRoute
