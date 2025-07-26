import type { VenueDetailDTO } from '@/dtos/venue-detail-dto';

export interface VenueDetailRepository {
  findVenueDetailByVenueId(id: string): Promise<VenueDetailDTO | null>;
  findVenueDetailByVenueSlug(slug: string): Promise<VenueDetailDTO | null>;
}
