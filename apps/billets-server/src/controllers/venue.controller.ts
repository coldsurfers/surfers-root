import type { ErrorResponseDTO } from '@/dtos/error-response.dto';
import type { VenueDetailDTO } from '@/dtos/venue-detail-dto';
import type { GetVenueByIdParamsDTO } from '@/dtos/venue.dto';
import { VenueDetailRepositoryImpl } from '@/repositories/venue-detail-repository.impl';
import { VenueDetailService } from '@/services/venue-detail.service';
import type { FastifyReply, FastifyRequest, RouteGenericInterface } from 'fastify';

const venueDetailRepository = new VenueDetailRepositoryImpl();
const venueDetailService = new VenueDetailService(venueDetailRepository);

interface GetVenueByIdRoute extends RouteGenericInterface {
  Params: GetVenueByIdParamsDTO;
  Reply: {
    200: VenueDetailDTO;
    404: ErrorResponseDTO;
    500: ErrorResponseDTO;
  };
}

export const getVenueByIdHandler = async (
  req: FastifyRequest<GetVenueByIdRoute>,
  rep: FastifyReply<GetVenueByIdRoute>
) => {
  try {
    const { id: venueId } = req.params;
    const venue = await venueDetailService.getVenueDetail(venueId);
    if (!venue) {
      return rep.status(404).send({
        code: 'VENUE_NOT_FOUND',
        message: 'Venue not found',
      });
    }
    return rep.status(200).send(venue);
  } catch (e) {
    console.error(e);
    return rep.status(500).send({
      code: 'UNKNOWN',
      message: 'internal server error',
    });
  }
};
