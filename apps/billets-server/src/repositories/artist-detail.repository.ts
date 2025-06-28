import type { ArtistDetailDTO } from '@/dtos/artist-detail.dto';

export interface ArtistDetailRepository {
  findArtistDetailById(id: string): Promise<ArtistDetailDTO | null>;
}
