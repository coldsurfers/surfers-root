import { searchListHandler } from '@/controllers/search.controller'
import { SearchDTOSchema } from '@/dtos/search.dto'
import { errorResponseSchema } from '@/lib/error'
import { FastifyPluginCallback } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { searchListQuerystringSchema } from './search.types'

/**
 * /v1/search
 */
const searchRoute: FastifyPluginCallback = (fastify, opts, done) => {
  fastify.withTypeProvider<ZodTypeProvider>().get(
    '/',
    {
      schema: {
        tags: ['v1', 'search'],
        querystring: searchListQuerystringSchema,
        response: {
          200: SearchDTOSchema.array(),
          500: errorResponseSchema,
        },
      },
    },
    searchListHandler,
  )
  done()
}

export default searchRoute
