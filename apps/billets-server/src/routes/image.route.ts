import { getImageResizeHandler } from '@/controllers/image.controller'
import { ErrorResponseDTOSchema } from '@/dtos/error-response.dto'
import { GetImageResizeQueryStringDTOSchema } from '@/dtos/image.dto'
import { FastifyPluginCallback } from 'fastify'

const imageRoute: FastifyPluginCallback = (fastify, opts, done) => {
  fastify.get(
    '/',
    {
      schema: {
        tags: ['v1', 'image'],
        querystring: GetImageResizeQueryStringDTOSchema,
        response: {
          400: ErrorResponseDTOSchema,
          500: ErrorResponseDTOSchema,
        },
      },
    },
    getImageResizeHandler,
  )
  done()
}

export default imageRoute
