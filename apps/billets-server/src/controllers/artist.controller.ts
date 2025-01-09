import { ArtistDTO } from '@/dtos/artist.dto'
import { errorResponseSchema } from '@/lib/error'
import { ArtistRepositoryImpl } from '@/repositories/artist.repository.impl'
import { ConcertRepositoryImpl } from '@/repositories/concert.repository.impl'
import {
  GetArtistByIdParams,
  getConcertListByArtistIdParamsSchema,
  getConcertListByArtistIdQueryStringSchema,
  getConcertListByArtistIdSuccessResponseSchema,
} from '@/routes/artist/artist.types'
import { ArtistService } from '@/services/artist.service'
import { ConcertService } from '@/services/concert.service'
import { RouteGenericInterface } from 'fastify'
import { FastifyReply } from 'fastify/types/reply'
import { FastifyRequest } from 'fastify/types/request'
import { z } from 'zod'

const artistRepository = new ArtistRepositoryImpl()
const artistService = new ArtistService(artistRepository)

const concertRepository = new ConcertRepositoryImpl()
const concertService = new ConcertService(concertRepository)

interface GetArtistByIdRoute extends RouteGenericInterface {
  Params: GetArtistByIdParams
  Reply: {
    200: ArtistDTO
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
    const artist = await artistService.findById(artistId)
    if (!artist) {
      return rep.status(404).send({
        code: 'ARTIST_NOT_FOUND',
        message: 'artist not found',
      })
    }
    return rep.status(200).send(artist)
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
    const concerts = await concertService.getManyByArtistId({
      artistId,
      orderBy: 'latest',
      take: +size,
      skip: +offset,
    })
    return rep.status(200).send(concerts)
  } catch (e) {
    return rep.status(500).send({
      code: 'UNKNOWN',
      message: 'internal server error',
    })
  }
}
