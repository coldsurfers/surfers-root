import type { ErrorResponseDTO } from '@/dtos/error-response.dto';
import type { EventCategoryDTO } from '@/dtos/event-category.dto';
import { EventCategoryRepositoryImpl } from '@/repositories/event-category.repository.impl';
import { EventCategoryService } from '@/services/event-category.service';
import type { RouteGenericInterface } from 'fastify';
import type { FastifyReply } from 'fastify/types/reply';
import type { FastifyRequest } from 'fastify/types/request';

const eventCategoryRepository = new EventCategoryRepositoryImpl();
const eventCategoryService = new EventCategoryService(eventCategoryRepository);

interface GetEventCategoryListRoute extends RouteGenericInterface {
  Reply: {
    200: EventCategoryDTO[];
    500: ErrorResponseDTO;
  };
}

export const getEventCategoryListHandler = async (
  _: FastifyRequest<GetEventCategoryListRoute>,
  rep: FastifyReply<GetEventCategoryListRoute>
) => {
  try {
    const data = await eventCategoryService.getAll();
    return rep.status(200).send(data);
  } catch (e) {
    console.error(e);
    return rep.status(500).send({
      code: 'UNKNOWN',
      message: 'internal server error',
    });
  }
};
