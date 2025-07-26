import type { ConcertDetailDTO } from '@/dtos/concert.dto';
import type { ConcertDetailRepository } from '@/repositories/concert-detail.repository';

export class ConcertDetailService {
  constructor(private concertDetailRepository: ConcertDetailRepository) {}

  async getConcertDetailById(id: string): Promise<ConcertDetailDTO | null> {
    return this.concertDetailRepository.getConcertDetailById(id);
  }

  async getConcertDetailBySlug(slug: string): Promise<ConcertDetailDTO | null> {
    return this.concertDetailRepository.getConcertDetailBySlug(slug);
  }
}
