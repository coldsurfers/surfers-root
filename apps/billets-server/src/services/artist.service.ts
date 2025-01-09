import { ArtistDTO } from '@/dtos/artist.dto'
import { ArtistRepository } from '@/repositories/artist.repository'

export class ArtistService {
  private artistRepository: ArtistRepository

  constructor(artistRepository: ArtistRepository) {
    this.artistRepository = artistRepository
  }

  async findById(id: string): Promise<ArtistDTO | null> {
    return this.artistRepository.findById(id)
  }
  async getSubscribedArtist(params: { artistId: string; userId: string }): Promise<ArtistDTO | null> {
    return this.artistRepository.findSubscribedArtist(params)
  }
  async subscribe(params: { userId: string; artistId: string }): Promise<ArtistDTO> {
    return this.artistRepository.subscribe(params)
  }
  async unsubscribe(params: { userId: string; artistId: string }): Promise<ArtistDTO> {
    return this.artistRepository.unsubscribe(params)
  }
}
