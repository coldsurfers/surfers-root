import { PosterDTO } from '@/dtos/poster.dto'
import { PosterRepository } from '@/repositories/poster.repository'

export class PosterService {
  private posterRepository: PosterRepository

  constructor(posterRepository: PosterRepository) {
    this.posterRepository = posterRepository
  }

  async getPostersByConcertId(concertId: string): Promise<PosterDTO[]> {
    return this.posterRepository.getPostersByConcertId(concertId)
  }
}
