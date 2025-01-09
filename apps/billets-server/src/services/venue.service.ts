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

  async getVenueByVenueIdUserId(params: { venueId: string; userId: string }): Promise<VenueDTO | null> {
    return this.venueRepository.findByVenueIdUserId(params)
  }

  async subscribe(params: { venueId: string; userId: string }): Promise<VenueDTO> {
    return this.venueRepository.subscribe(params)
  }

  async unsubscribe(params: { venueId: string; userId: string }): Promise<VenueDTO> {
    return this.venueRepository.unsubscribe(params)
  }
}
