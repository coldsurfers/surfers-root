import { getImageResizeHandler } from '@/controllers/image.controller'
import { ErrorResponseDTOSchema } from '@/dtos/error-response.dto'
import { GetImageResizeQueryStringDTOSchema } from '@/dtos/image.dto'
import { FastifyPluginCallback } from 'fastify'
import { z } from 'zod'

const imageRoute: FastifyPluginCallback = (fastify, opts, done) => {
  fastify.get(
    '/',
    {
      schema: {
        tags: ['v1', 'image'],
        querystring: GetImageResizeQueryStringDTOSchema,
        response: {
          200: z.instanceof(Buffer),
          304: z.instanceof(Buffer),
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
