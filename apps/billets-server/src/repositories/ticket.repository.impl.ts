import { TicketDTO } from '@/dtos/ticket.dto'
import { dbClient } from '@/lib/db'
import { Price, Ticket } from '@prisma/client'
import { TicketRepository } from './ticket.repository'

interface TicketModel extends Ticket {
  prices: Price[]
}

export class TicketRepositoryImpl implements TicketRepository {
  async findManyByConcertId(concertId: string): Promise<TicketDTO[]> {
    const data = await dbClient.ticket.findMany({
      where: {
        concerts: {
          some: {
            concertId,
          },
        },
      },
      include: {
        prices: {
          include: {
            price: true,
          },
        },
      },
    })

    return data.map((value) =>
      this.toDTO({
        ...value,
        prices: value.prices.map((price) => price.price),
      }),
    )
  }

  private toDTO(model: TicketModel): TicketDTO {
    return {
      prices: model.prices.map((price) => ({
        id: price.id,
        name: price.title,
        price: price.price,
        currency: price.priceCurrency,
      })),
      id: model.id,
      sellerName: model.seller,
      url: model.sellingURL,
      openDate: model.openDate.toISOString(),
    }
  }
}
