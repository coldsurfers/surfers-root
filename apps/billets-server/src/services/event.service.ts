import { FindManyConcertDTO } from '@/dtos/concert.dto'
import { EventDetailDTO, EventDTO } from '@/dtos/event.dto'
import { formatPrice, getCheapestPrice } from '@/lib/utils/utils.price'
import { ConcertDetailService } from './concert-detail.service'
import { ConcertService } from './concert.service'
import { TicketService } from './ticket.service'

export class EventService {
  constructor(
    private concertService: ConcertService,
    private concertDetailService: ConcertDetailService,
    private ticketService: TicketService,
  ) {}

  async getEvents({ type, data }: { type: 'concert'; data: FindManyConcertDTO }): Promise<EventDTO[]> {
    if (type === 'concert') {
      const concerts = await this.concertService.getMany(data)

      return concerts.map((concert) => ({
        type: 'concert',
        data: concert,
      }))
    }
    return []
  }

  async getEventDetailById({
    type,
    data,
  }: {
    type: 'concert'
    data: {
      id: string
    }
  }): Promise<EventDetailDTO | null> {
    if (type === 'concert') {
      const concertDetail = await this.concertDetailService.getConcertDetailById(data.id)
      if (!concertDetail) {
        return null
      }
      const { id: concertId } = concertDetail
      const tickets = await this.ticketService.getManyByConcertId(concertId)
      const ticketPromotes = tickets.map((ticket) => {
        const { prices } = ticket
        const cheapestPrice = getCheapestPrice(prices)
        const formattedPrice = cheapestPrice ? formatPrice(cheapestPrice) : ''
        return {
          seller: ticket.sellerName,
          sellingURL: ticket.url,
          formattedLowestPrice: formattedPrice,
        }
      })
      const mainTicketPromote = ticketPromotes.at(0)
      return {
        type: 'concert',
        data: {
          ...concertDetail,
          ticketPromotion: mainTicketPromote
            ? {
                formattedPrice: mainTicketPromote.formattedLowestPrice,
                seller: mainTicketPromote.seller,
              }
            : null,
        },
      }
    }
    return null
  }
}
