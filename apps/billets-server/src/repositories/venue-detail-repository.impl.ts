import { VenueDetailDTO } from '@/dtos/venue-detail-dto'
import { dbClient } from '@/lib/db'
import { Concert, Poster, Venue } from '@prisma/client'
import { VenueDetailRepository } from './venue-detail-repository'

interface VenueDetailModel extends Venue {
  concerts: (Concert & {
    posters: Poster[]
    venues: Venue[]
  })[]
}

export class VenueDetailRepositoryImpl implements VenueDetailRepository {
  async findVenueDetailByVenueId(id: string): Promise<VenueDetailDTO | null> {
    const data = await dbClient.venue.findUnique({
      where: {
        id,
      },
      include: {
        concerts: {
          where: {
            concert: {
              date: {
                gte: new Date(),
              },
            },
          },
          include: {
            concert: {
              include: {
                posters: {
                  include: {
                    poster: true,
                  },
                },
                venues: {
                  include: {
                    venue: true,
                  },
                },
              },
            },
          },
        },
      },
    })
    if (!data) {
      return null
    }
    return this.toDTO({
      ...data,
      concerts: data.concerts.map((concert) => {
        return {
          ...concert.concert,
          posters: concert.concert.posters.map((value) => value.poster),
          venues: concert.concert.venues.map((value) => value.venue),
        }
      }),
    })
  }

  private toDTO(model: VenueDetailModel): VenueDetailDTO {
    return {
      id: model.id,
      name: model.name,
      address: model.address,
      lat: model.lat,
      lng: model.lng,
      upcomingEvents: model.concerts.map((concert) => {
        const mainPoster = concert.posters.at(0)
        const mainVenue = concert.venues.at(0)
        return {
          type: 'concert',
          data: {
            id: concert.id,
            title: concert.title,
            date: concert.date.toISOString(),
            mainPoster: mainPoster
              ? {
                  url: mainPoster.imageURL,
                }
              : null,
            mainVenue: mainVenue
              ? {
                  name: mainVenue.name,
                }
              : null,
          },
        }
      }),
    }
  }
}
