import type { ArtistProfileImageDetailDTO } from '@/dtos/artist-profile-image-detail.dto';
import type { ArtistProfileImageDTO } from '@/dtos/artist-profile-image.dto';
import type { ArtistProfileImageRepository } from '@/repositories/artist-profile-image.repository';

export class ArtistProfileImageService {
  private artistProfileImageRepository: ArtistProfileImageRepository;
  constructor(artistProfileImageRepository: ArtistProfileImageRepository) {
    this.artistProfileImageRepository = artistProfileImageRepository;
  }

  async getMany(params: { artistId: string }): Promise<ArtistProfileImageDTO[]> {
    return this.artistProfileImageRepository.findMany(params);
  }
  async getDetail(params: {
    artistProfileImageId: string;
  }): Promise<ArtistProfileImageDetailDTO | null> {
    return this.artistProfileImageRepository.findOne(params);
  }
}
