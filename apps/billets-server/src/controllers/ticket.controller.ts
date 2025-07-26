import type { ErrorResponseDTO } from '@/dtos/error-response.dto';
import type { GetTicketsByEventIdQueryStringDTO, TicketDTO } from '@/dtos/ticket.dto';
import { TicketRepositoryImpl } from '@/repositories/ticket.repository.impl';
import { TicketService } from '@/services/ticket.service';
import type { RouteGenericInterface } from 'fastify';
import type { FastifyReply } from 'fastify/types/reply';
import type { FastifyRequest } from 'fastify/types/request';

const ticketRepository = new TicketRepositoryImpl();
const ticketService = new TicketService(ticketRepository);

interface GetTicketsByEventIdRoute extends RouteGenericInterface {
  Querystring: GetTicketsByEventIdQueryStringDTO;
  Reply: {
    200: TicketDTO[];
    500: ErrorResponseDTO;
  };
}

export const getTicketsByEventIdHandler = async (
  req: FastifyRequest<GetTicketsByEventIdRoute>,
  rep: FastifyReply<GetTicketsByEventIdRoute>
) => {
  try {
    const { eventId } = req.query;
    const data = await ticketService.getMany({ eventId });
    return rep.status(200).send(data);
  } catch (e) {
    console.error(e);
    return rep.status(500).send({
      code: 'UNKNOWN',
      message: 'internal server error',
    });
  }
};
