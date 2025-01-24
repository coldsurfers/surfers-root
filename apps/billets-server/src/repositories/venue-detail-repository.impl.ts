import { VenueDetailDTO } from '@/dtos/venue-detail-dto'
import { dbClient } from '@/lib/db'
import { Artist, ArtistProfileImage, Concert, Copyright, Poster, Venue } from '@prisma/client'
import { VenueDetailRepository } from './venue-detail-repository'

interface VenueDetailModel extends Venue {
  concerts: (Concert & {
    posters: Poster[]
    venues: Venue[]
    artists: (Artist & { artistProfileImage: (ArtistProfileImage & { copyright: Copyright | null })[] })[]
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
                artists: {
                  include: {
                    artist: {
                      include: {
                        artistProfileImage: {
                          include: {
                            copyright: true,
                          },
                        },
                      },
                    },
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
          artists: concert.concert.artists.map((value) => value.artist),
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
        const mainVenue = concert.venues.at(0)
        const mainArtist = concert.artists.at(0)
        return {
          type: 'concert',
          data: {
            id: concert.id,
            title: concert.title,
            date: concert.date.toISOString(),
            mainPoster: mainArtist
              ? {
                  url: mainArtist.artistProfileImage.at(0)?.imageURL ?? '',
                  copyright: mainArtist.artistProfileImage.at(0)?.copyright ?? null,
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
