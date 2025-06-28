import type { ErrorResponseDTO } from '@/dtos/error-response.dto';
import type {
  ArtistSubscribeDTO,
  EventSubscribeDTO,
  GetSubscribedArtistParamsDTO,
  GetSubscribedEventByEventIdParamsDTO,
  GetSubscribedQueryStringDTO,
  GetSubscribedVenueParamsDTO,
  SubscribeArtistBodyDTO,
  SubscribeEventBodyDTO,
  SubscribeInfoMeDTO,
  SubscribeVenueBodyDTO,
  UnsubscribeArtistBodyDTO,
  UnsubscribeVenueBodyDTO,
  VenueSubscribeDTO,
} from '@/dtos/subscribe.dto';
import { ArtistRepositoryImpl } from '@/repositories/artist.repository.impl';
import { ConcertDetailRepositoryImpl } from '@/repositories/concert-detail.repository.impl';
import { ConcertRepositoryImpl } from '@/repositories/concert.repository.impl';
import { SubscribeRepositoryImpl } from '@/repositories/subscribe.repository.impl';
import { TicketRepositoryImpl } from '@/repositories/ticket.repository.impl';
import { VenueRepositoryImpl } from '@/repositories/venue.repository.impl';
import { ArtistService } from '@/services/artist.service';
import { ConcertDetailService } from '@/services/concert-detail.service';
import { ConcertService } from '@/services/concert.service';
import { EventService } from '@/services/event.service';
import { SubscribeService } from '@/services/subscribe.service';
import { TicketService } from '@/services/ticket.service';
import { VenueService } from '@/services/venue.service';
import type { FastifyReply, FastifyRequest } from 'fastify';
import type { RouteGenericInterface } from 'fastify/types/route';

const artistRepository = new ArtistRepositoryImpl();
const artistService = new ArtistService(artistRepository);

const venueRepository = new VenueRepositoryImpl();
const venueService = new VenueService(venueRepository);

const subscribeRepository = new SubscribeRepositoryImpl();
const subscribeService = new SubscribeService(subscribeRepository);

const concertRepository = new ConcertRepositoryImpl();
const concertService = new ConcertService(concertRepository);
const concertDetailRepository = new ConcertDetailRepositoryImpl();
const concertDetailService = new ConcertDetailService(concertDetailRepository);
const ticketRepository = new TicketRepositoryImpl();
const ticketService = new TicketService(ticketRepository);

const eventService = new EventService(concertService, concertDetailService, ticketService);

interface GetSubscribeInfoMeRoute extends RouteGenericInterface {
  Reply: {
    200: SubscribeInfoMeDTO;
    401: ErrorResponseDTO;
    500: ErrorResponseDTO;
  };
}
export const getSubscribeInfoMeHandler = async (
  req: FastifyRequest<GetSubscribeInfoMeRoute>,
  rep: FastifyReply<GetSubscribeInfoMeRoute>
) => {
  try {
    const result = await subscribeService.getSubscribeInfoMe({
      userId: req.user.id,
    });
    return rep.status(200).send(result);
  } catch (e) {
    console.error(e);
    return rep.status(500).send({ code: 'UNKNOWN', message: 'internal server error' });
  }
};

interface GetSubscribedEventsRoute extends RouteGenericInterface {
  Querystring: GetSubscribedQueryStringDTO;
  Reply: {
    200: EventSubscribeDTO[];
    401: ErrorResponseDTO;
    500: ErrorResponseDTO;
  };
}

export const getSubscribedEventsHandler = async (
  req: FastifyRequest<GetSubscribedEventsRoute>,
  rep: FastifyReply<GetSubscribedEventsRoute>
) => {
  try {
    const { offset, size } = req.query;

    const subscribedEvents = await subscribeService.getSubscribedEvents({
      userId: req.user.id,
      take: +size,
      skip: +offset,
    });

    return rep.status(200).send(subscribedEvents);
  } catch (e) {
    console.error(e);
    return rep.status(500).send({ code: 'UNKNOWN', message: 'internal server error' });
  }
};

interface GetSubscribedArtistsRoute extends RouteGenericInterface {
  Querystring: GetSubscribedQueryStringDTO;
  Reply: {
    200: ArtistSubscribeDTO[];
    401: ErrorResponseDTO;
    500: ErrorResponseDTO;
  };
}

export const getSubscribedArtistsHandler = async (
  req: FastifyRequest<GetSubscribedArtistsRoute>,
  rep: FastifyReply<GetSubscribedArtistsRoute>
) => {
  try {
    const { offset, size } = req.query;

    const subscribedArtists = await subscribeService.getSubscribedArtists({
      userId: req.user.id,
      take: +size,
      skip: +offset,
    });

    return rep.status(200).send(subscribedArtists);
  } catch (e) {
    console.error(e);
    return rep.status(500).send({ code: 'UNKNOWN', message: 'internal server error' });
  }
};

interface GetSubscribedVenuesRoute extends RouteGenericInterface {
  Querystring: GetSubscribedQueryStringDTO;
  Reply: {
    200: VenueSubscribeDTO[];
    401: ErrorResponseDTO;
    500: ErrorResponseDTO;
  };
}

export const getSubscribedVenuesHandler = async (
  req: FastifyRequest<GetSubscribedVenuesRoute>,
  rep: FastifyReply<GetSubscribedVenuesRoute>
) => {
  try {
    const { offset, size } = req.query;

    const subscribedVenues = await subscribeService.getSubscribedVenues({
      userId: req.user.id,
      take: +size,
      skip: +offset,
    });

    return rep.status(200).send(subscribedVenues);
  } catch (e) {
    console.error(e);
    return rep.status(500).send({ code: 'UNKNOWN', message: 'internal server error' });
  }
};

interface GetSubscribedEventRoute extends RouteGenericInterface {
  Params: GetSubscribedEventByEventIdParamsDTO;
  Reply: {
    200: EventSubscribeDTO;
    401: ErrorResponseDTO;
    404: ErrorResponseDTO;
    500: ErrorResponseDTO;
  };
}

export const getSubscribedEventHandler = async (
  req: FastifyRequest<GetSubscribedEventRoute>,
  rep: FastifyReply<GetSubscribedEventRoute>
) => {
  try {
    const { eventId } = req.params;
    const subscribedConcert = await subscribeService.getSubscribedEvent({
      eventId,
      userId: req.user.id,
    });
    if (!subscribedConcert) {
      return rep.status(404).send({
        code: 'SUBSCRIBED_CONCERT_NOT_FOUND',
        message: 'subscribed concert not found',
      });
    }
    return rep.status(200).send(subscribedConcert);
  } catch (e) {
    console.error(e);
    return rep.status(500).send({ code: 'UNKNOWN', message: 'internal server error' });
  }
};

interface GetArtistSubscribeRoute extends RouteGenericInterface {
  Params: GetSubscribedArtistParamsDTO;
  Reply: {
    200: ArtistSubscribeDTO;
    401: ErrorResponseDTO;
    404: ErrorResponseDTO;
    500: ErrorResponseDTO;
  };
}

export const getSubscribedArtistHandler = async (
  req: FastifyRequest<GetArtistSubscribeRoute>,
  rep: FastifyReply<GetArtistSubscribeRoute>
) => {
  try {
    const { artistId } = req.params;
    const artist = await artistService.findById(artistId);
    if (!artist) {
      return rep.status(404).send({
        code: 'ARTIST_NOT_FOUND',
        message: 'artist not found',
      });
    }
    const subscribedArtist = await subscribeService.getSubscribedArtist({
      artistId,
      userId: req.user.id,
    });
    if (!subscribedArtist) {
      return rep.status(404).send({
        code: 'SUBSCRIBED_ARTIST_NOT_FOUND',
        message: 'subscribed artist not found',
      });
    }
    return rep.status(200).send(subscribedArtist);
  } catch (e) {
    console.error(e);
    return rep.status(500).send({
      code: 'UNKNOWN',
      message: 'internal server error',
    });
  }
};

interface GetVenueSubscribeRoute extends RouteGenericInterface {
  Params: GetSubscribedVenueParamsDTO;
  Reply: {
    200: VenueSubscribeDTO;
    401: ErrorResponseDTO;
    404: ErrorResponseDTO;
    500: ErrorResponseDTO;
  };
}

export const getVenueSubscribeHandler = async (
  req: FastifyRequest<GetVenueSubscribeRoute>,
  rep: FastifyReply<GetVenueSubscribeRoute>
) => {
  try {
    const { venueId } = req.params;
    const venue = await venueService.getVenueById(venueId);
    if (!venue) {
      return rep.status(404).send({
        code: 'VENUE_NOT_FOUND',
        message: 'venue not found',
      });
    }
    const subscribedVenue = await subscribeService.getSubscribedVenue({
      venueId,
      userId: req.user.id,
    });
    if (!subscribedVenue) {
      return rep.status(404).send({
        code: 'SUBSCRIBED_VENUE_NOT_FOUND',
        message: 'subscribed venue not found',
      });
    }
    return rep.status(200).send(subscribedVenue);
  } catch (e) {
    console.error(e);
    return rep.status(500).send({
      code: 'UNKNOWN',
      message: 'internal server error',
    });
  }
};

interface PostSubscribeEventRoute extends RouteGenericInterface {
  Body: SubscribeEventBodyDTO;
  Reply: {
    200: EventSubscribeDTO;
    401: ErrorResponseDTO;
    404: ErrorResponseDTO;
    500: ErrorResponseDTO;
  };
}

export const postSubscribeEventHandler = async (
  req: FastifyRequest<PostSubscribeEventRoute>,
  rep: FastifyReply<PostSubscribeEventRoute>
) => {
  try {
    const { eventId } = req.body;

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

    const subscribedEvent = await subscribeService.getSubscribedEvent({
      userId: req.user.id,
      eventId,
    });

    if (subscribedEvent) {
      return rep.status(200).send(subscribedEvent);
    }

    const newSubscribedEvent = await subscribeService.subscribeEvent({
      userId: req.user.id,
      eventId,
    });

    return rep.status(200).send(newSubscribedEvent);
  } catch (e) {
    console.error(e);
    return rep.status(500).send({ code: 'UNKNOWN', message: 'internal server error' });
  }
};

interface UnsubscribeEventRoute extends RouteGenericInterface {
  Body: SubscribeEventBodyDTO;
  Reply: {
    200: EventSubscribeDTO;
    401: ErrorResponseDTO;
    404: ErrorResponseDTO;
    500: ErrorResponseDTO;
  };
}

export const unsubscribeEventHandler = async (
  req: FastifyRequest<UnsubscribeEventRoute>,
  rep: FastifyReply<UnsubscribeEventRoute>
) => {
  try {
    const { eventId } = req.body;

    const event = await eventService.getEventDetailById({
      type: 'concert',
      data: {
        id: eventId,
      },
    });

    if (!event) {
      return rep.status(404).send({ code: 'EVENT_NOT_FOUND', message: 'Event not found' });
    }

    const subscribedEvent = await subscribeService.getSubscribedEvent({
      userId: req.user.id,
      eventId,
    });

    if (!subscribedEvent) {
      return rep
        .status(404)
        .send({ code: 'SUBSCRIBED_CONCERT_NOT_FOUND', message: 'Concert not found' });
    }

    const data = await subscribeService.unsubscribeEvent({ eventId, userId: req.user.id });

    return rep.status(200).send(data);
  } catch (e) {
    console.error(e);
    return rep.status(500).send({ code: 'UNKNOWN', message: 'internal server error' });
  }
};

interface PostSubscribeArtistRoute extends RouteGenericInterface {
  Body: SubscribeArtistBodyDTO;
  Reply: {
    200: ArtistSubscribeDTO;
    401: ErrorResponseDTO;
    404: ErrorResponseDTO;
    500: ErrorResponseDTO;
  };
}

export const postSubscribeArtistHandler = async (
  req: FastifyRequest<PostSubscribeArtistRoute>,
  rep: FastifyReply<PostSubscribeArtistRoute>
) => {
  try {
    const { artistId } = req.body;

    const artist = await artistService.findById(artistId);
    if (!artist) {
      return rep.status(404).send({ code: 'ARTIST_NOT_FOUND', message: 'Artist not found' });
    }

    const subscribedArtist = await subscribeService.getSubscribedArtist({
      artistId,
      userId: req.user.id,
    });

    if (subscribedArtist) {
      return rep.status(200).send(subscribedArtist);
    }

    const data = await subscribeService.subscribeArtist({
      artistId,
      userId: req.user.id,
    });

    return rep.status(200).send(data);
  } catch (e) {
    console.error(e);
    return rep.status(500).send({ code: 'UNKNOWN', message: 'internal server error' });
  }
};

interface DeleteUnsubscribeArtistRoute extends RouteGenericInterface {
  Body: UnsubscribeArtistBodyDTO;
  Reply: {
    200: ArtistSubscribeDTO;
    401: ErrorResponseDTO;
    404: ErrorResponseDTO;
    500: ErrorResponseDTO;
  };
}

export const deleteUnsubscribeArtistHandler = async (
  req: FastifyRequest<DeleteUnsubscribeArtistRoute>,
  rep: FastifyReply
) => {
  try {
    const { artistId } = req.body;

    const artist = await artistService.findById(artistId);
    if (!artist) {
      return rep.status(404).send({ code: 'ARTIST_NOT_FOUND', message: 'Artist not found' });
    }

    const subscribedArtist = await subscribeService.getSubscribedArtist({
      artistId,
      userId: req.user.id,
    });

    if (!subscribedArtist) {
      return rep
        .status(404)
        .send({ code: 'SUBSCRIBED_ARTIST_NOT_FOUND', message: 'Artist not found' });
    }

    const data = await subscribeService.unsubscribeArtist({
      artistId,
      userId: req.user.id,
    });

    return rep.status(200).send(data);
  } catch (e) {
    console.error(e);
    return rep.status(500).send({ code: 'UNKNOWN', message: 'internal server error' });
  }
};

interface PostSubscribeVenueRoute extends RouteGenericInterface {
  Body: SubscribeVenueBodyDTO;
  Reply: {
    200: VenueSubscribeDTO;
    401: ErrorResponseDTO;
    404: ErrorResponseDTO;
    500: ErrorResponseDTO;
  };
}

export const postSubscribeVenueHandler = async (
  req: FastifyRequest<PostSubscribeVenueRoute>,
  rep: FastifyReply<PostSubscribeVenueRoute>
) => {
  try {
    const { venueId } = req.body;

    const venue = await venueService.getVenueById(venueId);
    if (!venue) {
      return rep.status(404).send({ code: 'VENUE_NOT_FOUND', message: 'Venue not found' });
    }

    const subscribedVenue = await subscribeService.getSubscribedVenue({
      venueId,
      userId: req.user.id,
    });

    if (subscribedVenue) {
      return rep.status(200).send(subscribedVenue);
    }

    const data = await subscribeService.subscribeVenue({ venueId, userId: req.user.id });

    return rep.status(200).send(data);
  } catch (e) {
    console.error(e);
    return rep.status(500).send({ code: 'UNKNOWN', message: 'internal server error' });
  }
};

interface DeleteUnsubscribeVenueRoute extends RouteGenericInterface {
  Body: UnsubscribeVenueBodyDTO;
  Reply: {
    200: VenueSubscribeDTO;
    401: ErrorResponseDTO;
    404: ErrorResponseDTO;
    500: ErrorResponseDTO;
  };
}

export const deleteUnsubscribeVenueHandler = async (
  req: FastifyRequest<DeleteUnsubscribeVenueRoute>,
  rep: FastifyReply<DeleteUnsubscribeVenueRoute>
) => {
  try {
    const { venueId } = req.body;

    const venue = await venueService.getVenueById(venueId);
    if (!venue) {
      return rep.status(404).send({ code: 'VENUE_NOT_FOUND', message: 'Venue not found' });
    }

    const subscribedVenue = await subscribeService.getSubscribedVenue({
      venueId,
      userId: req.user.id,
    });

    if (!subscribedVenue) {
      return rep
        .status(404)
        .send({ code: 'SUBSCRIBED_VENUE_NOT_FOUND', message: 'Venue not found' });
    }

    const data = await subscribeService.unsubscribeVenue({ venueId, userId: req.user.id });

    return rep.status(200).send(data);
  } catch (e) {
    console.error(e);
    return rep.status(500).send({ code: 'UNKNOWN', message: 'internal server error' });
  }
};
