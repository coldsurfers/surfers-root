import type { ArtistDTO } from '@/dtos/artist.dto';

export interface ArtistRepository {
  findById(id: string): Promise<ArtistDTO | null>;
  findManyByConcertId(concertId: string): Promise<ArtistDTO[]>;
}
