import { SearchDTO } from '@/dtos/search-dto'
import { SearchDTOSerialized } from '@/dtos/search-dto/search-dto.types'
import { ErrorResponse } from '@/lib/error'
import { SearchListQuerystring } from '@/routes/search/search.types'
import { FastifyReply, FastifyRequest, RouteGenericInterface } from 'fastify'

interface SearchListRoute extends RouteGenericInterface {
  Querystring: SearchListQuerystring
  Reply: {
    200: SearchDTOSerialized[]
    500: ErrorResponse
  }
}

export const searchListHandler = async (req: FastifyRequest<SearchListRoute>, rep: FastifyReply<SearchListRoute>) => {
  try {
    const { keyword } = req.query
    const data = await SearchDTO.searchList(keyword)
    return rep.status(200).send(data.map((value) => value.serialize()))
  } catch (e) {
    console.error(e)
    return rep.status(500).send({
      code: 'UNKNOWN',
      message: 'unknown error',
    })
  }
}
