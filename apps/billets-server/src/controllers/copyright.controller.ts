import { CopyrightDTO, GetCopyrightByArtistProfileImageIdParamsDTO } from '@/dtos/copyright.dto'
import { ErrorResponseDTO } from '@/dtos/error-response.dto'
import { CopyrightRepositoryImpl } from '@/repositories/copyright.repository.impl'
import { CopyrightService } from '@/services/copyright.service'
import { RouteGenericInterface } from 'fastify'
import { FastifyReply } from 'fastify/types/reply'
import { FastifyRequest } from 'fastify/types/request'

const copyrightRepository = new CopyrightRepositoryImpl()
const copyrightService = new CopyrightService(copyrightRepository)

interface GetCopyrightByArtistProfileImageIdRoute extends RouteGenericInterface {
  Params: GetCopyrightByArtistProfileImageIdParamsDTO
  Reply: {
    200: CopyrightDTO | null
    500: ErrorResponseDTO
  }
}

export const getCopyrightByArtistProfileImageIdHandler = async (
  req: FastifyRequest<GetCopyrightByArtistProfileImageIdRoute>,
  rep: FastifyReply<GetCopyrightByArtistProfileImageIdRoute>,
) => {
  try {
    const data = await copyrightService.findByArtistProfileImageId(req.params.artistProfileImageId)
    return rep.status(200).send(data)
  } catch (e) {
    return rep.status(500).send({
      code: 'UNKNOWN',
      message: 'internal server error',
    })
  }
}
