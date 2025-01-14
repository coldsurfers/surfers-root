import { ConcertDetailDTO } from '@/dtos/concert.dto'
import { ConcertDetailRepository } from '@/repositories/concert-detail.repository'

export class ConcertDetailService {
  constructor(private concertDetailRepository: ConcertDetailRepository) {}

  async getConcertDetailById(id: string): Promise<ConcertDetailDTO | null> {
    return this.concertDetailRepository.getConcertDetailById(id)
  }
}
