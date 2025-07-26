import type { TicketDTO } from '@/dtos/ticket.dto';

export interface TicketRepository {
  findMany(params: { eventId: string }): Promise<TicketDTO[]>;
}
