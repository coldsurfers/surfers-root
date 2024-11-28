import { RouteHandler } from 'fastify'
import SearchDTO from '../dtos/SearchDTO'
import { SearchDTOSerialized } from '../dtos/SearchDTO.types'
import { ErrorResponse } from '../lib/types'
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
      code: 'INTERNAL_SERVER_ERROR',
      message: '',
    })
  }
}
