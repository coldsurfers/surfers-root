import { SearchDTO } from '@/dtos/search.dto'
import { ErrorResponse } from '@/lib/error'
import { SearchRepositoryImpl } from '@/repositories/search.repository.impl'
import { SearchListQuerystring } from '@/routes/search/search.types'
import { SearchService } from '@/services/search.service'
import { FastifyReply, FastifyRequest, RouteGenericInterface } from 'fastify'

const searchRepository = new SearchRepositoryImpl()
const searchService = new SearchService(searchRepository)

interface SearchListRoute extends RouteGenericInterface {
  Querystring: SearchListQuerystring
  Reply: {
    200: SearchDTO[]
    500: ErrorResponse
  }
}

export const searchListHandler = async (req: FastifyRequest<SearchListRoute>, rep: FastifyReply<SearchListRoute>) => {
  try {
    const { keyword } = req.query
    const data = await searchService.searchManyByKeyword(keyword)
    return rep.status(200).send(data)
  } catch (e) {
    console.error(e)
    return rep.status(500).send({
      code: 'UNKNOWN',
      message: 'unknown error',
    })
  }
}
