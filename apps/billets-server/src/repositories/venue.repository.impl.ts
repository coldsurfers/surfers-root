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
