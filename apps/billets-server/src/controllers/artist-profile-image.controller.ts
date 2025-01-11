import { ArtistProfileImageDTO, GetArtistProfileImagesByArtistIdParamsDTO } from '@/dtos/artist-profile-image.dto'
import { ErrorResponseDTO } from '@/dtos/error-response.dto'
import { ArtistProfileImageRepositoryImpl } from '@/repositories/artist-profile-image.repository.impl'
import { ArtistProfileImageService } from '@/services/artist-profile-image.service'
import { RouteGenericInterface } from 'fastify'
import { FastifyReply } from 'fastify/types/reply'
import { FastifyRequest } from 'fastify/types/request'

const artistProfileImageRepository = new ArtistProfileImageRepositoryImpl()
const artistProfileImageService = new ArtistProfileImageService(artistProfileImageRepository)

interface GetArtistProfileImagesByArtistIdRoute extends RouteGenericInterface {
  Params: GetArtistProfileImagesByArtistIdParamsDTO
  Reply: {
    200: ArtistProfileImageDTO[]
    500: ErrorResponseDTO
  }
}

export const getArtistProfileImagesByArtistIdHandler = async (
  req: FastifyRequest<GetArtistProfileImagesByArtistIdRoute>,
  rep: FastifyReply<GetArtistProfileImagesByArtistIdRoute>,
) => {
  try {
    const data = await artistProfileImageService.getManyByArtistId(req.params.artistId)
    return rep.status(200).send(data)
  } catch (e) {
    return rep.status(500).send({
      code: 'UNKNOWN',
      message: 'internal server error',
    })
  }
}
