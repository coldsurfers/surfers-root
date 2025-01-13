import { ArtistDTO, GetArtistByIdParamsDTO } from '@/dtos/artist.dto'
import { ErrorResponseDTO } from '@/dtos/error-response.dto'
import { ArtistDetailRepositoryImpl } from '@/repositories/artist-detail.repository.impl'
import { ArtistDetailService } from '@/services/artist-detail.service'
import { RouteGenericInterface } from 'fastify'
import { FastifyReply } from 'fastify/types/reply'
import { FastifyRequest } from 'fastify/types/request'

const artistDetailRepository = new ArtistDetailRepositoryImpl()
const artistDetailService = new ArtistDetailService(artistDetailRepository)

interface GetArtistByIdRoute extends RouteGenericInterface {
  Params: GetArtistByIdParamsDTO
  Reply: {
    200: ArtistDTO
    404: ErrorResponseDTO
    500: ErrorResponseDTO
  }
}

export const getArtistByIdHandler = async (
  req: FastifyRequest<GetArtistByIdRoute>,
  rep: FastifyReply<GetArtistByIdRoute>,
) => {
  try {
    const { id: artistId } = req.params
    const artist = await artistDetailService.getArtistDetail(artistId)
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
