import { ArtistDetailDTO } from '@/dtos/artist-detail.dto'
import { dbClient } from '@/lib/db'
import { Artist, ArtistProfileImage, Concert, Poster, Venue } from '@prisma/client'
import { ArtistDetailRepository } from './artist-detail.repository'

interface ArtistDetailModel extends Artist {
  concerts: (Concert & {
    posters: Poster[]
    venues: Venue[]
  })[]
  artistProfileImage: ArtistProfileImage[]
}

export class ArtistDetailRepositoryImpl implements ArtistDetailRepository {
  async findArtistDetailById(id: string): Promise<ArtistDetailDTO | null> {
    const data = await dbClient.artist.findUnique({
      where: {
        id,
      },
      include: {
        artistProfileImage: true,
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

  private toDTO(model: ArtistDetailModel): ArtistDetailDTO {
    return {
      id: model.id,
      name: model.name,
      thumbUrl: model.artistProfileImage.at(0)?.imageURL ?? '',
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
