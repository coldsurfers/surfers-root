import type { VenueDTO } from '@/dtos/venue.dto';
import { dbClient } from '@/lib/db/db.client';
import type { Venue } from '@prisma/client';
import type { VenueRepository } from './venue.repository';

export class VenueRepositoryImpl implements VenueRepository {
  async findVenuesByConcertId(concertId: string): Promise<VenueDTO[]> {
    const venues = await dbClient.venue.findMany({
      where: {
        concerts: {
          some: {
            concertId,
          },
        },
      },
    });
    return venues.map((venue) => this.toDTO(venue));
  }
  async findById(id: string): Promise<VenueDTO | null> {
    const venue = await dbClient.venue.findUnique({
      where: {
        id,
      },
    });
    return venue ? this.toDTO(venue) : null;
  }

  async findByVenueIdUserId(params: { venueId: string; userId: string }): Promise<VenueDTO | null> {
    const subscribedVenue = await dbClient.usersOnSubscribedVenues.findFirst({
      where: {
        venueId: params.venueId,
        userId: params.userId,
      },
      include: {
        venue: true,
      },
    });
    return subscribedVenue ? this.toDTO(subscribedVenue.venue) : null;
  }

  private toDTO(model: Venue): VenueDTO {
    return {
      id: model.id,
      name: model.name,
      address: model.address,
      lat: model.lat,
      lng: model.lng,
      slug: model.slug,
    };
  }
}
