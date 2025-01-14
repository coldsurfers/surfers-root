import { CopyrightDTO } from '@/dtos/copyright.dto'
import { CopyrightRepository } from '@/repositories/copyright.repository'

export class CopyrightService {
  private copyrightRepository: CopyrightRepository

  constructor(copyrightRepository: CopyrightRepository) {
    this.copyrightRepository = copyrightRepository
  }

  async findByArtistProfileImageId(artistProfileImageId: string): Promise<CopyrightDTO | null> {
    return this.copyrightRepository.findByArtistProfileImageId(artistProfileImageId)
  }
}
