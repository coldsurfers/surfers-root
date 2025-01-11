import { ErrorResponseDTO } from '@/dtos/error-response.dto'
import { GetTicketsByConcertIdParamsDTO, TicketDTO } from '@/dtos/ticket.dto'
import { TicketRepositoryImpl } from '@/repositories/ticket.repository.impl'
import { TicketService } from '@/services/ticket.service'
import { RouteGenericInterface } from 'fastify'
import { FastifyReply } from 'fastify/types/reply'
import { FastifyRequest } from 'fastify/types/request'

const ticketRepository = new TicketRepositoryImpl()
const ticketService = new TicketService(ticketRepository)

interface GetTicketsByConcertIdRoute extends RouteGenericInterface {
  Params: GetTicketsByConcertIdParamsDTO
  Reply: {
    200: TicketDTO[]
    500: ErrorResponseDTO
  }
}

export const getTicketsByConcertIdHandler = async (
  req: FastifyRequest<GetTicketsByConcertIdRoute>,
  rep: FastifyReply<GetTicketsByConcertIdRoute>,
) => {
  try {
    const data = await ticketService.getManyByConcertId(req.params.concertId)
    return rep.status(200).send(data)
  } catch (e) {
    return rep.status(500).send({
      code: 'UNKNOWN',
      message: 'internal server error',
    })
  }
}
