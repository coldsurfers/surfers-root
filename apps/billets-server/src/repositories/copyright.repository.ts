import type { CopyrightDTO } from '@/dtos/copyright.dto';

export interface CopyrightRepository {
  findByArtistProfileImageId(artistProfileImageId: string): Promise<CopyrightDTO | null>;
}
