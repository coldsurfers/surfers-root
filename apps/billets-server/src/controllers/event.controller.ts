import type { ErrorResponseDTO } from '@/dtos/error-response.dto';
import type {
  EventDTO,
  EventDetailDTO,
  GetEventDetailByIdParamsDTO,
  GetEventDetailBySlugParamsDTO,
  GetEventDetailBySlugQuerystringDTO,
  GetEventsQueryStringDTO,
} from '@/dtos/event.dto';
import geohashUtils from '@/lib/geohashUtils';
import type { LatLng } from '@/lib/types';
import { ConcertDetailRepositoryImpl } from '@/repositories/concert-detail.repository.impl';
import { ConcertRepositoryImpl } from '@/repositories/concert.repository.impl';
import { TicketRepositoryImpl } from '@/repositories/ticket.repository.impl';
import { ConcertDetailService } from '@/services/concert-detail.service';
import { ConcertService } from '@/services/concert.service';
import { EventService } from '@/services/event.service';
import { TicketService } from '@/services/ticket.service';
import type { FastifyReply, FastifyRequest, RouteGenericInterface } from 'fastify';

const concertRepository = new ConcertRepositoryImpl();
const concertService = new ConcertService(concertRepository);
const concertDetailRepository = new ConcertDetailRepositoryImpl();
const concertDetailService = new ConcertDetailService(concertDetailRepository);
const ticketRepository = new TicketRepositoryImpl();
const ticketService = new TicketService(ticketRepository);
const eventService = new EventService(concertService, concertDetailService, ticketService);

interface GetEventsRoute extends RouteGenericInterface {
  Querystring: GetEventsQueryStringDTO;
  Reply: {
    200: EventDTO[];
    500: ErrorResponseDTO;
  };
}

export const getEventsHandler = async (
  req: FastifyRequest<GetEventsRoute>,
  rep: FastifyReply<GetEventsRoute>
) => {
  try {
    const {
      offset,
      size,
      latitude,
      longitude,
      locationCityId,
      eventCategoryName,
      locationCityName,
    } = req.query;
    const latLng: LatLng | null =
      latitude && longitude
        ? {
            latitude: +latitude,
            longitude: +longitude,
          }
        : null;
    const geohash: string | null = latLng
      ? geohashUtils.generate(latLng.latitude, latLng.longitude, 3)
      : null;

    const events = await eventService.getEvents({
      type: 'concert',
      data: {
        orderBy: 'latest',
        take: +size,
        skip: +offset,
        venueGeohash: geohash,
        locationCityId: locationCityId ?? null,
        eventCategoryName: eventCategoryName ?? null,
        locationCityName: locationCityName ?? null,
      },
    });
    return rep.status(200).send(events);
  } catch (e) {
    console.error(e);
    return rep.status(500).send({
      code: 'UNKNOWN',
      message: 'internal server error',
    });
  }
};

interface GetEventDetailByIdRoute extends RouteGenericInterface {
  Params: GetEventDetailByIdParamsDTO;
  Reply: {
    200: EventDetailDTO;
    404: ErrorResponseDTO;
    500: ErrorResponseDTO;
  };
}

export const getEventDetailByIdHandler = async (
  req: FastifyRequest<GetEventDetailByIdRoute>,
  rep: FastifyReply<GetEventDetailByIdRoute>
) => {
  try {
    const { eventId } = req.params;
    const event = await eventService.getEventDetailById({
      type: 'concert',
      data: {
        id: eventId,
      },
    });
    if (!event) {
      return rep.status(404).send({
        code: 'EVENT_NOT_FOUND',
        message: 'event not found',
      });
    }
    return rep.status(200).send(event);
  } catch (e) {
    console.error(e);
    return rep.status(500).send({
      code: 'UNKNOWN',
      message: 'internal server error',
    });
  }
};

interface GetEventDetailBySlugRoute extends RouteGenericInterface {
  Params: GetEventDetailBySlugParamsDTO;
  Querystring: GetEventDetailBySlugQuerystringDTO;
  Reply: {
    200: EventDetailDTO;
    404: ErrorResponseDTO;
    500: ErrorResponseDTO;
  };
}

export const getEventDetailBySlugHandler = async (
  req: FastifyRequest<GetEventDetailBySlugRoute>,
  rep: FastifyReply<GetEventDetailBySlugRoute>
) => {
  try {
    const slugValue = req.query.slug ?? req.params.slug;
    if (!slugValue) {
      return rep.status(404).send({
        code: 'EVENT_NOT_FOUND',
        message: 'event not found',
      });
    }
    const slug = decodeURIComponent(slugValue);
    const event = await eventService.getEventDetailBySlug({
      type: 'concert',
      data: {
        slug,
      },
    });
    if (!event) {
      return rep.status(404).send({
        code: 'EVENT_NOT_FOUND',
        message: 'event not found',
      });
    }
    return rep.status(200).send(event);
  } catch (e) {
    console.error(e);
    return rep.status(500).send({
      code: 'UNKNOWN',
      message: 'internal server error',
    });
  }
};
