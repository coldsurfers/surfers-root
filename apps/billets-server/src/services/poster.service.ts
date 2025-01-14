import { PosterDTO } from '@/dtos/poster.dto'
import { PosterRepository } from '@/repositories/poster.repository'

export class PosterService {
  private posterRepository: PosterRepository

  constructor(posterRepository: PosterRepository) {
    this.posterRepository = posterRepository
  }

  async getPosters(params: { eventId: string }): Promise<PosterDTO[]> {
    return this.posterRepository.findMany(params)
  }
}
