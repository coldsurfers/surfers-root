import { VenueDTO } from '@/dtos/venue.dto'
import { dbClient } from '@/lib/db/db.client'
import { VenueRepository } from './venue.repository'

interface VenueModel {
  id: string
  name: string
  address: string | null
  lat: number
  lng: number
}

export class VenueRepositoryImpl implements VenueRepository {
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
    const subscribedVenue = await dbClient.usersOnSubscribedVenues.create({
      data: {
        userId: params.userId,
        venueId: params.venueId,
      },
      include: {
        venue: true,
      },
    })
    return this.toDTO({
      address: subscribedVenue.venue.address,
      id: subscribedVenue.venue.id,
      lat: subscribedVenue.venue.lat,
      lng: subscribedVenue.venue.lng,
      name: subscribedVenue.venue.name,
    })
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
    return this.toDTO({
      address: data.venue.address,
      id: data.venue.id,
      lat: data.venue.lat,
      lng: data.venue.lng,
      name: data.venue.name,
    })
  }

  private toDTO(data: VenueModel): VenueDTO {
    return {
      id: data.id,
      name: data.name,
      address: data.address ?? '',
      lat: data.lat,
      lng: data.lng,
    }
  }
}
