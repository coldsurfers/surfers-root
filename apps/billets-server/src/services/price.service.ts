import type { PriceDTO } from '@/dtos/price.dto';
import type { PriceRepository } from '@/repositories/price.repository';

export class PriceService {
  private priceRepository: PriceRepository;

  constructor(priceRepository: PriceRepository) {
    this.priceRepository = priceRepository;
  }

  async getMany(params: { ticketId: string }): Promise<PriceDTO[]> {
    return this.priceRepository.findMany(params);
  }
}
