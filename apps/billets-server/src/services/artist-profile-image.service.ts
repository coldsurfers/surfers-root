import { ArtistProfileImageDTO } from '@/dtos/artist-profile-image.dto'
import { ArtistProfileImageRepository } from '@/repositories/artist-profile-image.repository'

export class ArtistProfileImageService {
  private artistProfileImageRepository: ArtistProfileImageRepository
  constructor(artistProfileImageRepository: ArtistProfileImageRepository) {
    this.artistProfileImageRepository = artistProfileImageRepository
  }

  async getManyByArtistId(artistId: string): Promise<ArtistProfileImageDTO[]> {
    return this.artistProfileImageRepository.findManyByArtistId(artistId)
  }
}
