import type { ErrorResponseDTO } from '@/dtos/error-response.dto';
import type { GetPricesByTicketIdQueryStringDTO, PriceDTO } from '@/dtos/price.dto';
import { PriceRepositoryImpl } from '@/repositories/price.repository.impl';
import { PriceService } from '@/services/price.service';
import type { FastifyReply } from 'fastify/types/reply';
import type { FastifyRequest } from 'fastify/types/request';
import type { RouteGenericInterface } from 'fastify/types/route';

const priceRepository = new PriceRepositoryImpl();
const priceService = new PriceService(priceRepository);

interface GetPricesByTicketIdRoute extends RouteGenericInterface {
  Querystring: GetPricesByTicketIdQueryStringDTO;
  Reply: {
    200: PriceDTO[];
    500: ErrorResponseDTO;
  };
}

export const getPricesByTicketIdHandler = async (
  req: FastifyRequest<GetPricesByTicketIdRoute>,
  rep: FastifyReply<GetPricesByTicketIdRoute>
) => {
  try {
    const { ticketId } = req.query;
    const data = await priceService.getMany({ ticketId });
    return rep.status(200).send(data);
  } catch (e) {
    console.error(e);
    return rep.status(500).send({
      code: 'UNKNOWN',
      message: 'internal server error',
    });
  }
};
