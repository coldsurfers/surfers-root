import { TicketDTO } from '@/dtos/ticket.dto'
import { dbClient } from '@/lib/db'
import { Ticket } from '@prisma/client'
import { TicketRepository } from './ticket.repository'

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
    })

    return data.map(this.toDTO)
  }

  private toDTO(model: Ticket): TicketDTO {
    return {
      id: model.id,
      openDate: model.openDate.toISOString(),
      sellerName: model.seller,
      url: model.sellingURL,
    }
  }
}
