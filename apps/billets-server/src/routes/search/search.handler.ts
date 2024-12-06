import { SearchDTO } from '@/dtos/search-dto'
import { SearchDTOSerialized } from '@/dtos/search-dto/search-dto.types'
import { ErrorResponse } from '@/lib/error'
import { RouteHandler } from 'fastify'
import { SearchListQuerystring } from './search.types'

export const searchListHandler: RouteHandler<{
  Querystring: SearchListQuerystring
  Reply: {
    200: SearchDTOSerialized[]
    500: ErrorResponse
  }
}> = async (req, rep) => {
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
