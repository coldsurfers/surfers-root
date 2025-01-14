import {
  ArtistProfileImageDetailDTO,
  GetArtistProfileImageDetailParamsDTO,
} from '@/dtos/artist-profile-image-detail.dto'
import { ArtistProfileImageDTO, GetArtistProfileImagesByArtistIdQueryStringDTO } from '@/dtos/artist-profile-image.dto'
import { ErrorResponseDTO } from '@/dtos/error-response.dto'
import { ArtistProfileImageRepositoryImpl } from '@/repositories/artist-profile-image.repository.impl'
import { ArtistProfileImageService } from '@/services/artist-profile-image.service'
import { RouteGenericInterface } from 'fastify'
import { FastifyReply } from 'fastify/types/reply'
import { FastifyRequest } from 'fastify/types/request'

const artistProfileImageRepository = new ArtistProfileImageRepositoryImpl()
const artistProfileImageService = new ArtistProfileImageService(artistProfileImageRepository)

interface GetArtistProfileImagesByArtistIdRoute extends RouteGenericInterface {
  Querystring: GetArtistProfileImagesByArtistIdQueryStringDTO
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
    const { artistId } = req.query
    const data = await artistProfileImageService.getMany({ artistId })
    return rep.status(200).send(data)
  } catch (e) {
    return rep.status(500).send({
      code: 'UNKNOWN',
      message: 'internal server error',
    })
  }
}

interface GetArtistProfileImageDetailRoute extends RouteGenericInterface {
  Params: GetArtistProfileImageDetailParamsDTO
  Reply: {
    200: ArtistProfileImageDetailDTO
    404: ErrorResponseDTO
    500: ErrorResponseDTO
  }
}

export const GetArtistProfileImageDetailHandler = async (
  req: FastifyRequest<GetArtistProfileImageDetailRoute>,
  rep: FastifyReply<GetArtistProfileImageDetailRoute>,
) => {
  try {
    const { artistProfileImageId } = req.params
    const data = await artistProfileImageService.getDetail({ artistProfileImageId })
    if (!data) {
      return rep.status(404).send({
        code: 'ARTIST_PROFILE_IMAGE_NOT_FOUND',
        message: 'artist profile image not found',
      })
    }
    return rep.status(200).send(data)
  } catch (e) {
    return rep.status(500).send({
      code: 'UNKNOWN',
      message: 'internal server error',
    })
  }
}
