import ArtistDTO from '@/dtos/ArtistDTO'
import { ArtistDTOSerialized } from '@/dtos/ArtistDTO.types'
import ConcertDTO from '@/dtos/ConcertDTO'
import { errorResponseSchema } from '@/lib/error'
import { RouteHandler } from 'fastify'
import { z } from 'zod'
import {
  GetArtistByIdParams,
  getConcertListByArtistIdParamsSchema,
  getConcertListByArtistIdQueryStringSchema,
  getConcertListByArtistIdSuccessResponseSchema,
} from './artist.types'

export const getArtistByIdHandler: RouteHandler<{
  Params: GetArtistByIdParams
  Reply: {
    200: ArtistDTOSerialized
    404: z.infer<typeof errorResponseSchema>
    500: z.infer<typeof errorResponseSchema>
  }
}> = async (req, rep) => {
  try {
    const { id: artistId } = req.params
    const artistDTO = await ArtistDTO.findById(artistId)
    if (!artistDTO) {
      return rep.status(404).send({
        code: 'ARTIST_NOT_FOUND',
        message: 'artist not found',
      })
    }
    return rep.status(200).send(artistDTO.serialize())
  } catch (e) {
    console.error(e)
    return rep.status(500).send({
      code: 'UNKNOWN',
      message: 'internal server error',
    })
  }
}

export const getConcertListByArtistIdRoute: RouteHandler<{
  Params: z.infer<typeof getConcertListByArtistIdParamsSchema>
  Querystring: z.infer<typeof getConcertListByArtistIdQueryStringSchema>
  Reply: {
    200: z.infer<typeof getConcertListByArtistIdSuccessResponseSchema>
    500: z.infer<typeof errorResponseSchema>
  }
}> = async (req, rep) => {
  try {
    const { artistId } = req.params
    const { offset, size } = req.query
    const dtos = await ConcertDTO.listByArtistId(artistId, {
      orderBy: 'latest',
      take: +size,
      skip: +offset,
    })
    return rep.status(200).send(dtos.map((dto) => dto.serialize()))
  } catch (e) {
    return rep.status(500).send({
      code: 'UNKNOWN',
      message: 'internal server error',
    })
  }
}
