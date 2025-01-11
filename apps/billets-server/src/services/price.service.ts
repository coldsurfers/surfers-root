import { PriceDTO } from '@/dtos/price.dto'
import { PriceRepository } from '@/repositories/price.repository'

export class PriceService {
  private priceRepository: PriceRepository

  constructor(priceRepository: PriceRepository) {
    this.priceRepository = priceRepository
  }

  async getManyByTicketId(ticketId: string): Promise<PriceDTO[]> {
    return this.priceRepository.findManyByTicketId(ticketId)
  }
}
