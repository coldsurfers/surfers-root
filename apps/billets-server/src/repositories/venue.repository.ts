import { VenueDTO } from '@/dtos/venue.dto'

export interface VenueRepository {
  findById(id: string): Promise<VenueDTO | null>
}
