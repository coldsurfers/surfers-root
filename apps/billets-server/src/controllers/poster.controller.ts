import { ErrorResponseDTO } from '@/dtos/error-response.dto'
import { GetPostersByConcertIdParamsDTO, PosterDTO } from '@/dtos/poster.dto'
import { PosterRepositoryImpl } from '@/repositories/poster.repository.impl'
import { PosterService } from '@/services/poster.service'
import { FastifyReply, FastifyRequest, RouteGenericInterface } from 'fastify'

const posterRepository = new PosterRepositoryImpl()
const posterService = new PosterService(posterRepository)

interface GetPosterByConcertIdRoute extends RouteGenericInterface {
  Params: GetPostersByConcertIdParamsDTO
  Reply: {
    200: PosterDTO[]
    500: ErrorResponseDTO
  }
}

export const getPostersByConcertIdHandler = async (
  req: FastifyRequest<GetPosterByConcertIdRoute>,
  rep: FastifyReply<GetPosterByConcertIdRoute>,
) => {
  try {
    const { concertId } = req.params
    const data = await posterService.getPostersByConcertId(concertId)
    return rep.status(200).send(data)
  } catch (e) {
    return rep.status(500).send({
      code: 'UNKNOWN',
      message: 'internal server error',
    })
  }
}
