import type { PosterDetailDTO } from '@/dtos/poster-detail.dto';
import type { PosterDTO } from '@/dtos/poster.dto';
import type { PosterRepository } from '@/repositories/poster.repository';

export class PosterService {
  private posterRepository: PosterRepository;

  constructor(posterRepository: PosterRepository) {
    this.posterRepository = posterRepository;
  }

  async getPosters(params: { eventId: string }): Promise<PosterDTO[]> {
    return this.posterRepository.findMany(params);
  }

  async getPosterDetail(params: { posterId: string }): Promise<PosterDetailDTO | null> {
    return this.posterRepository.findOne(params);
  }
}
