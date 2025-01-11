import { TicketDTO } from '@/dtos/ticket.dto'

export interface TicketRepository {
  findManyByConcertId(concertId: string): Promise<TicketDTO[]>
}
