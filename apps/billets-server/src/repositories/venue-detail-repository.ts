import { VenueDetailDTO } from '@/dtos/venue-detail-dto'

export interface VenueDetailRepository {
  findVenueDetailByVenueId(id: string): Promise<VenueDetailDTO | null>
}
