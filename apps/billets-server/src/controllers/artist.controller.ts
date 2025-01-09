import { ArtistDTO, ArtistDTOSerialized } from '@/dtos/artist-dto'
import { ConcertDTO } from '@/dtos/concert-dto'
import { errorResponseSchema } from '@/lib/error'
import {
  GetArtistByIdParams,
  getConcertListByArtistIdParamsSchema,
  getConcertListByArtistIdQueryStringSchema,
  getConcertListByArtistIdSuccessResponseSchema,
} from '@/routes/artist/artist.types'
import { RouteGenericInterface } from 'fastify'
import { FastifyReply } from 'fastify/types/reply'
import { FastifyRequest } from 'fastify/types/request'
import { z } from 'zod'

interface GetArtistByIdRoute extends RouteGenericInterface {
  Params: GetArtistByIdParams
  Reply: {
    200: ArtistDTOSerialized
    404: z.infer<typeof errorResponseSchema>
    500: z.infer<typeof errorResponseSchema>
  }
}

export const getArtistByIdHandler = async (
  req: FastifyRequest<GetArtistByIdRoute>,
  rep: FastifyReply<GetArtistByIdRoute>,
) => {
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

interface GetConcertListByArtistIdRoute extends RouteGenericInterface {
  Params: z.infer<typeof getConcertListByArtistIdParamsSchema>
  Querystring: z.infer<typeof getConcertListByArtistIdQueryStringSchema>
  Reply: {
    200: z.infer<typeof getConcertListByArtistIdSuccessResponseSchema>
    500: z.infer<typeof errorResponseSchema>
  }
}

export const getConcertListByArtistIdHandler = async (
  req: FastifyRequest<GetConcertListByArtistIdRoute>,
  rep: FastifyReply<GetConcertListByArtistIdRoute>,
) => {
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
