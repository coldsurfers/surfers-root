import { ErrorResponseDTO } from '@/dtos/error-response.dto'
import { GetPricesByTicketIdParamsDTO, PriceDTO } from '@/dtos/price.dto'
import { PriceRepositoryImpl } from '@/repositories/price.repository.impl'
import { PriceService } from '@/services/price.service'
import { FastifyReply } from 'fastify/types/reply'
import { FastifyRequest } from 'fastify/types/request'
import { RouteGenericInterface } from 'fastify/types/route'

const priceRepository = new PriceRepositoryImpl()
const priceService = new PriceService(priceRepository)

interface GetPricesByTicketIdRoute extends RouteGenericInterface {
  Params: GetPricesByTicketIdParamsDTO
  Reply: {
    200: PriceDTO[]
    500: ErrorResponseDTO
  }
}

export const getPricesByTicketIdHandler = async (
  req: FastifyRequest<GetPricesByTicketIdRoute>,
  rep: FastifyReply<GetPricesByTicketIdRoute>,
) => {
  try {
    const data = await priceService.getManyByTicketId(req.params.ticketId)
    return rep.status(200).send(data)
  } catch (e) {
    return rep.status(500).send({
      code: 'UNKNOWN',
      message: 'internal server error',
    })
  }
}
