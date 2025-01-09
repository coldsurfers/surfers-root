import { dbClient } from '@/lib/db'
import { z } from 'zod'
import { LocationConcertDTOProps, locationConcertDTOSerializedSchema } from './location-concert-dto.types'

export class LocationConcertDTO {
  constructor(private props: LocationConcertDTOProps) {}

  static async listByGeohashes(geohashes: string[]) {
    const data = await dbClient.concert.findMany({
      where: {
        venues: {
          some: {
            venue: {
              OR: geohashes.map((geohash) => ({
                geohash: {
                  startsWith: geohash,
                },
              })),
            },
          },
        },
        date: {
          gte: new Date(),
        },
      },
      orderBy: {
        date: 'asc',
      },
      include: {
        venues: {
          select: {
            venue: {
              select: {
                lat: true,
                lng: true,
              },
            },
          },
        },
      },
    })
    return data.map(
      (item) =>
        new LocationConcertDTO({
          id: item.id,
          title: item.title,
          latitude: item.venues[0].venue.lat,
          longitude: item.venues[0].venue.lng,
        }),
    )
  }

  serialize(): z.infer<typeof locationConcertDTOSerializedSchema> {
    const validation = locationConcertDTOSerializedSchema.safeParse({
      id: this.props.id,
      title: this.props.title,
      latitude: this.props.latitude,
      longitude: this.props.longitude,
    })
    if (!validation.success) {
      throw validation.error
    }
    return validation.data
  }
}
