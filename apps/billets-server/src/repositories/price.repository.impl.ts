import type { PriceDTO } from '@/dtos/price.dto';
import { dbClient } from '@/lib/db';
import type { Price } from '@prisma/client';
import type { PriceRepository } from './price.repository';

export class PriceRepositoryImpl implements PriceRepository {
  async findMany(params: { ticketId: string }): Promise<PriceDTO[]> {
    const data = await dbClient.price.findMany({
      where: {
        tickets: {
          some: {
            ticketId: params.ticketId,
          },
        },
      },
    });
    return data.map(this.toDTO);
  }

  private toDTO(model: Price): PriceDTO {
    return {
      id: model.id,
      name: model.title,
      price: model.price,
      currency: model.priceCurrency,
    };
  }
}
