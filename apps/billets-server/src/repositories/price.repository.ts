import { PriceDTO } from '@/dtos/price.dto'

export interface PriceRepository {
  findMany(params: { ticketId: string }): Promise<PriceDTO[]>
}
