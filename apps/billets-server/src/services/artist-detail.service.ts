import type { ArtistDetailDTO } from '@/dtos/artist-detail.dto';
import type { ArtistDetailRepository } from '@/repositories/artist-detail.repository';

export class ArtistDetailService {
  constructor(private artistDetailRepository: ArtistDetailRepository) {}

  async getArtistDetail(id: string): Promise<ArtistDetailDTO | null> {
    return this.artistDetailRepository.findArtistDetailById(id);
  }
}
