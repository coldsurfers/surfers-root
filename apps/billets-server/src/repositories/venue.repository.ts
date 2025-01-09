import { VenueDTO } from '@/dtos/venue.dto'

export interface VenueRepository {
  findById(id: string): Promise<VenueDTO | null>
  findByVenueIdUserId(params: { venueId: string; userId: string }): Promise<VenueDTO | null>
  subscribe(params: { venueId: string; userId: string }): Promise<VenueDTO>
  unsubscribe(params: { venueId: string; userId: string }): Promise<VenueDTO>
}
