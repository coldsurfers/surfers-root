import type { ArtistDetailDTO } from '@/dtos/artist-detail.dto';
import type { GetArtistByIdParamsDTO } from '@/dtos/artist.dto';
import type { ErrorResponseDTO } from '@/dtos/error-response.dto';
import { ArtistDetailRepositoryImpl } from '@/repositories/artist-detail.repository.impl';
import { ArtistDetailService } from '@/services/artist-detail.service';
import type { RouteGenericInterface } from 'fastify';
import type { FastifyReply } from 'fastify/types/reply';
import type { FastifyRequest } from 'fastify/types/request';

const artistDetailRepository = new ArtistDetailRepositoryImpl();
const artistDetailService = new ArtistDetailService(artistDetailRepository);

interface GetArtistByIdRoute extends RouteGenericInterface {
  Params: GetArtistByIdParamsDTO;
  Reply: {
    200: ArtistDetailDTO;
    404: ErrorResponseDTO;
    500: ErrorResponseDTO;
  };
}

export const getArtistByIdHandler = async (
  req: FastifyRequest<GetArtistByIdRoute>,
  rep: FastifyReply<GetArtistByIdRoute>
) => {
  try {
    const { id: artistId } = req.params;
    const artist = await artistDetailService.getArtistDetail(artistId);
    if (!artist) {
      return rep.status(404).send({
        code: 'ARTIST_NOT_FOUND',
        message: 'artist not found',
      });
    }
    return rep.status(200).send(artist);
  } catch (e) {
    console.error(e);
    return rep.status(500).send({
      code: 'UNKNOWN',
      message: 'internal server error',
    });
  }
};
