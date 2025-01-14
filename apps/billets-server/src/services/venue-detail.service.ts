import { VenueDetailDTO } from '@/dtos/venue-detail-dto'
import { VenueDetailRepository } from '@/repositories/venue-detail-repository'

export class VenueDetailService {
  constructor(private venueDetailRepository: VenueDetailRepository) {}

  async getVenueDetail(id: string): Promise<VenueDetailDTO | null> {
    return await this.venueDetailRepository.findVenueDetailByVenueId(id)
  }
}
