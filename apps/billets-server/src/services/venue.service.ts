import { VenueDTO } from '@/dtos/venue.dto'
import { VenueRepository } from '@/repositories/venue.repository'

export class VenueService {
  private venueRepository: VenueRepository

  constructor(venueRepository: VenueRepository) {
    this.venueRepository = venueRepository
  }

  async getVenueById(id: string): Promise<VenueDTO | null> {
    return this.venueRepository.findById(id)
  }
}
