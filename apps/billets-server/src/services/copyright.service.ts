import type { CopyrightDTO } from '@/dtos/copyright.dto';
import type { CopyrightRepository } from '@/repositories/copyright.repository';

export class CopyrightService {
  private copyrightRepository: CopyrightRepository;

  constructor(copyrightRepository: CopyrightRepository) {
    this.copyrightRepository = copyrightRepository;
  }

  async findByArtistProfileImageId(artistProfileImageId: string): Promise<CopyrightDTO | null> {
    return this.copyrightRepository.findByArtistProfileImageId(artistProfileImageId);
  }
}
