import { VenueDTO } from '@/dtos/venue.dto'
import { VenueRepository } from '@/repositories/venue.repository'

export class VenueService {
  private venueRepository: VenueRepository

  constructor(venueRepository: VenueRepository) {
    this.venueRepository = venueRepository
  }

  async getVenuesByConcertId(concertId: string): Promise<VenueDTO[]> {
    return this.venueRepository.findVenuesByConcertId(concertId)
  }

  async getVenueById(id: string): Promise<VenueDTO | null> {
    return this.venueRepository.findById(id)
  }

  async getVenueByVenueIdUserId(params: { venueId: string; userId: string }): Promise<VenueDTO | null> {
    return this.venueRepository.findByVenueIdUserId(params)
  }
}
