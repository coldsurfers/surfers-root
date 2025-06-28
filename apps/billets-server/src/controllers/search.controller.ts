import type { ErrorResponseDTO } from '@/dtos/error-response.dto';
import type { SearchDTO, SearchListQueryStringDTO } from '@/dtos/search.dto';
import { SearchRepositoryImpl } from '@/repositories/search.repository.impl';
import { SearchService } from '@/services/search.service';
import type { FastifyReply, FastifyRequest, RouteGenericInterface } from 'fastify';

const searchRepository = new SearchRepositoryImpl();
const searchService = new SearchService(searchRepository);

interface SearchListRoute extends RouteGenericInterface {
  Querystring: SearchListQueryStringDTO;
  Reply: {
    200: SearchDTO[];
    500: ErrorResponseDTO;
  };
}

export const searchListHandler = async (
  req: FastifyRequest<SearchListRoute>,
  rep: FastifyReply<SearchListRoute>
) => {
  try {
    const { keyword } = req.query;
    const data = await searchService.searchManyByKeyword(keyword);
    return rep.status(200).send(data);
  } catch (e) {
    console.error(e);
    return rep.status(500).send({
      code: 'UNKNOWN',
      message: 'unknown error',
    });
  }
};
