import type { ArtistDTO } from '@/dtos/artist.dto';
import type { ArtistRepository } from '@/repositories/artist.repository';

export class ArtistService {
  private artistRepository: ArtistRepository;

  constructor(artistRepository: ArtistRepository) {
    this.artistRepository = artistRepository;
  }

  async findById(id: string): Promise<ArtistDTO | null> {
    return this.artistRepository.findById(id);
  }
  async getManyByConcertId(concertId: string): Promise<ArtistDTO[]> {
    return this.artistRepository.findManyByConcertId(concertId);
  }
}
