import { ErrorResponseDTO } from '@/dtos/error-response.dto'
import { GetPostersByEventIdQueryStringDTO, PosterDTO } from '@/dtos/poster.dto'
import { PosterRepositoryImpl } from '@/repositories/poster.repository.impl'
import { PosterService } from '@/services/poster.service'
import { FastifyReply, FastifyRequest, RouteGenericInterface } from 'fastify'

const posterRepository = new PosterRepositoryImpl()
const posterService = new PosterService(posterRepository)

interface GetPosterByEventIdRoute extends RouteGenericInterface {
  Querystring: GetPostersByEventIdQueryStringDTO
  Reply: {
    200: PosterDTO[]
    500: ErrorResponseDTO
  }
}

export const getPostersByEventIdHandler = async (
  req: FastifyRequest<GetPosterByEventIdRoute>,
  rep: FastifyReply<GetPosterByEventIdRoute>,
) => {
  try {
    const { eventId } = req.query
    const data = await posterService.getPosters({ eventId })
    return rep.status(200).send(data)
  } catch (e) {
    return rep.status(500).send({
      code: 'UNKNOWN',
      message: 'internal server error',
    })
  }
}
