import { ErrorResponseDTO } from '@/dtos/error-response.dto'
import { GetTicketsByEventIdQueryStringDTO, TicketDTO } from '@/dtos/ticket.dto'
import { TicketRepositoryImpl } from '@/repositories/ticket.repository.impl'
import { TicketService } from '@/services/ticket.service'
import { RouteGenericInterface } from 'fastify'
import { FastifyReply } from 'fastify/types/reply'
import { FastifyRequest } from 'fastify/types/request'

const ticketRepository = new TicketRepositoryImpl()
const ticketService = new TicketService(ticketRepository)

interface GetTicketsByEventIdRoute extends RouteGenericInterface {
  Querystring: GetTicketsByEventIdQueryStringDTO
  Reply: {
    200: TicketDTO[]
    500: ErrorResponseDTO
  }
}

export const getTicketsByEventIdHandler = async (
  req: FastifyRequest<GetTicketsByEventIdRoute>,
  rep: FastifyReply<GetTicketsByEventIdRoute>,
) => {
  try {
    const { eventId } = req.query
    const data = await ticketService.getMany({ eventId })
    return rep.status(200).send(data)
  } catch (e) {
    return rep.status(500).send({
      code: 'UNKNOWN',
      message: 'internal server error',
    })
  }
}
