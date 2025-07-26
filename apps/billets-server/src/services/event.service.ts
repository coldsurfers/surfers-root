import type { FindManyConcertDTO } from '@/dtos/concert.dto';
import type { EventDTO, EventDetailDTO } from '@/dtos/event.dto';
import { getCheapestPrice } from '@/lib/utils/utils.price';
import type { ConcertDetailService } from './concert-detail.service';
import type { ConcertService } from './concert.service';
import type { TicketService } from './ticket.service';

export class EventService {
  constructor(
    private concertService: ConcertService,
    private concertDetailService: ConcertDetailService,
    private ticketService: TicketService
  ) {}

  async getEvents({
    type,
    data,
  }: { type: 'concert'; data: FindManyConcertDTO }): Promise<EventDTO[]> {
    if (type === 'concert') {
      const concerts = await this.concertService.getMany(data);

      return concerts.map((concert) => ({
        type: 'concert',
        data: concert,
      }));
    }
    return [];
  }

  async getEventDetailById({
    type,
    data,
  }: {
    type: 'concert';
    data: {
      id: string;
    };
  }): Promise<EventDetailDTO | null> {
    if (type === 'concert') {
      const concertDetail = await this.concertDetailService.getConcertDetailById(data.id);
      if (!concertDetail) {
        return null;
      }
      const { id: concertId } = concertDetail;
      const tickets = await this.ticketService.getMany({ eventId: concertId });
      const ticketPromotes = tickets.map((ticket) => {
        const { prices } = ticket;
        const cheapestPrice = getCheapestPrice(prices);
        return {
          ticket: ticket,
          price: cheapestPrice,
        };
      });
      const mainTicketPromote = ticketPromotes.at(0);
      return {
        type: 'concert',
        data: {
          ...concertDetail,
          ticketPromotion: mainTicketPromote
            ? {
                id: mainTicketPromote.ticket.id,
                url: mainTicketPromote.ticket.url,
                sellerName: mainTicketPromote.ticket.sellerName,
                openDate: mainTicketPromote.ticket.openDate,
                price: mainTicketPromote.price,
              }
            : null,
        },
      };
    }
    return null;
  }

  async getEventDetailBySlug({
    type,
    data,
  }: {
    type: 'concert';
    data: {
      slug: string;
    };
  }): Promise<EventDetailDTO | null> {
    if (type === 'concert') {
      const concertDetail = await this.concertDetailService.getConcertDetailBySlug(data.slug);
      if (!concertDetail) {
        return null;
      }
      const { id: concertId } = concertDetail;
      const tickets = await this.ticketService.getMany({ eventId: concertId });
      const ticketPromotes = tickets.map((ticket) => {
        const { prices } = ticket;
        const cheapestPrice = getCheapestPrice(prices);
        return {
          ticket: ticket,
          price: cheapestPrice,
        };
      });
      const mainTicketPromote = ticketPromotes.at(0);
      return {
        type: 'concert',
        data: {
          ...concertDetail,
          ticketPromotion: mainTicketPromote
            ? {
                id: mainTicketPromote.ticket.id,
                url: mainTicketPromote.ticket.url,
                sellerName: mainTicketPromote.ticket.sellerName,
                openDate: mainTicketPromote.ticket.openDate,
                price: mainTicketPromote.price,
              }
            : null,
        },
      };
    }
    return null;
  }
}
