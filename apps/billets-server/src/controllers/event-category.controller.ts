import { ErrorResponseDTO } from '@/dtos/error-response.dto'
import { EventCategoryDTO } from '@/dtos/event-category.dto'
import { EventCategoryRepositoryImpl } from '@/repositories/event-category.repository.impl'
import { EventCategoryService } from '@/services/event-category.service'
import { RouteGenericInterface } from 'fastify'
import { FastifyReply } from 'fastify/types/reply'
import { FastifyRequest } from 'fastify/types/request'

const eventCategoryRepository = new EventCategoryRepositoryImpl()
const eventCategoryService = new EventCategoryService(eventCategoryRepository)

interface GetEventCategoryListRoute extends RouteGenericInterface {
  Reply: {
    200: EventCategoryDTO[]
    500: ErrorResponseDTO
  }
}

export const getEventCategoryListHandler = async (
  req: FastifyRequest<GetEventCategoryListRoute>,
  rep: FastifyReply<GetEventCategoryListRoute>,
) => {
  try {
    const data = await eventCategoryService.getAll()
    return rep.status(200).send(data)
  } catch (e) {
    console.error(e)
    return rep.status(500).send({
      code: 'UNKNOWN',
      message: 'internal server error',
    })
  }
}
