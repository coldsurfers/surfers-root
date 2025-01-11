import { PriceDTO } from '@/dtos/price.dto'

export interface PriceRepository {
  findManyByTicketId(ticketId: string): Promise<PriceDTO[]>
}
