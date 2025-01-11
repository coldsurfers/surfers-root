import { VenueDTO } from '@/dtos/venue.dto'
import { dbClient } from '@/lib/db/db.client'
import { Venue } from '@prisma/client'
import { VenueRepository } from './venue.repository'

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
    })
    return venues.map((venue) => this.toDTO(venue))
  }
  async findById(id: string): Promise<VenueDTO | null> {
    const venue = await dbClient.venue.findUnique({
      where: {
        id,
      },
    })
    return venue ? this.toDTO(venue) : null
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
    })
    return subscribedVenue ? this.toDTO(subscribedVenue.venue) : null
  }

  async subscribe(params: { venueId: string; userId: string }): Promise<VenueDTO> {
    const data = await dbClient.usersOnSubscribedVenues.create({
      data: {
        userId: params.userId,
        venueId: params.venueId,
      },
      include: {
        venue: true,
      },
    })
    return this.toDTO(data.venue)
  }

  async unsubscribe(params: { venueId: string; userId: string }): Promise<VenueDTO> {
    const data = await dbClient.usersOnSubscribedVenues.delete({
      where: {
        userId_venueId: {
          userId: params.userId,
          venueId: params.venueId,
        },
      },
      include: {
        venue: true,
      },
    })
    return this.toDTO(data.venue)
  }

  private toDTO(model: Venue): VenueDTO {
    return {
      id: model.id,
      name: model.name,
      address: model.address,
      lat: model.lat,
      lng: model.lng,
    }
  }
}
