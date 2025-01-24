import {
  ConcertDTO,
  FindManyByArtistIdConcertDTO,
  FindManyByVenueIdConcertDTO,
  FindManyConcertDTO,
  SubscribeUnsubscribeConcertDTO,
} from '@/dtos/concert.dto'
import { dbClient } from '@/lib/db/db.client'
import { Artist, ArtistProfileImage, Concert, Copyright, Poster, Venue } from '@prisma/client'
import { ConcertRepository } from './concert.repository'

interface ConcertModel extends Concert {
  posters: Poster[]
  venues: Venue[]
  artists: (Artist & { artistProfileImage: (ArtistProfileImage & { copyright: Copyright | null })[] })[]
}

export class ConcertRepositoryImpl implements ConcertRepository {
  async findById(id: string): Promise<ConcertDTO | null> {
    const data = await dbClient.concert.findUnique({
      where: {
        id,
      },
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
    })
    if (!data) {
      return null
    }
    const posters = data.posters.map((value) => value.poster)
    const venues = data.venues.map((value) => value.venue)
    return this.toDTO({
      ...data,
      posters,
      venues,
      artists: [],
    })
  }
  async findMany(params: FindManyConcertDTO): Promise<ConcertDTO[]> {
    const data = await dbClient.concert.findMany({
      where: {
        ...(params.titleContains && {
          title: {
            contains: params.titleContains,
          },
        }),
        ...(params.venueGeohash && {
          venues: {
            some: {
              venue: {
                geohash: {
                  startsWith: params.venueGeohash,
                },
              },
            },
          },
        }),
        deletedAt: {
          equals: null,
        },
        date: {
          gte: new Date(),
        },
      },
      orderBy: {
        date: 'asc',
      },
      take: params.take,
      skip: params.skip,
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
    })

    return data.map((value) =>
      this.toDTO({
        ...value,
        posters: value.posters.map((value) => value.poster),
        venues: value.venues.map((value) => value.venue),
        artists: value.artists.map((value) => value.artist),
      }),
    )
  }
  async findManyByVenueId(params: FindManyByVenueIdConcertDTO): Promise<ConcertDTO[]> {
    const data = await dbClient.concert.findMany({
      where: {
        venues: {
          some: {
            venueId: params.venueId,
          },
        },
        deletedAt: {
          equals: null,
        },
      },
      orderBy: {
        createdAt: params.orderBy === 'latest' ? 'desc' : 'asc',
      },
      take: params.take,
      skip: params.skip,
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
    })

    return data.map((value) => {
      return this.toDTO({
        ...value,
        posters: value.posters.map((value) => value.poster),
        venues: value.venues.map((value) => value.venue),
        artists: [],
      })
    })
  }
  async findManyByArtistId(params: FindManyByArtistIdConcertDTO): Promise<ConcertDTO[]> {
    const data = await dbClient.concert.findMany({
      where: {
        artists: {
          some: {
            artistId: params.artistId,
          },
        },
        deletedAt: {
          equals: null,
        },
      },
      orderBy: {
        createdAt: params.orderBy === 'latest' ? 'desc' : 'asc',
      },
      take: params.take,
      skip: params.skip,
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
    })

    return data.map((value) =>
      this.toDTO({
        ...value,
        posters: value.posters.map((value) => value.poster),
        venues: value.venues.map((value) => value.venue),
        artists: [],
      }),
    )
  }

  async subscribe(params: SubscribeUnsubscribeConcertDTO): Promise<ConcertDTO> {
    const data = await dbClient.usersOnSubscribedConcerts.create({
      data: {
        userId: params.userId,
        concertId: params.concertId,
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
    })

    return this.toDTO({
      ...data.concert,
      posters: data.concert.posters.map((value) => value.poster),
      venues: data.concert.venues.map((value) => value.venue),
      artists: [],
    })
  }

  async unsubscribe(params: SubscribeUnsubscribeConcertDTO): Promise<ConcertDTO> {
    const data = await dbClient.usersOnSubscribedConcerts.delete({
      where: {
        userId_concertId: {
          userId: params.userId,
          concertId: params.concertId,
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
    })

    return this.toDTO({
      ...data.concert,
      posters: data.concert.posters.map((value) => value.poster),
      venues: data.concert.venues.map((value) => value.venue),
      artists: [],
    })
  }

  async findSubscribedConcert(params: { userId: string; concertId: string }): Promise<ConcertDTO | null> {
    const data = await dbClient.usersOnSubscribedConcerts.findUnique({
      where: {
        userId_concertId: {
          userId: params.userId,
          concertId: params.concertId,
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
    })
    return data
      ? this.toDTO({
          ...data.concert,
          posters: data.concert.posters.map((value) => value.poster),
          venues: data.concert.venues.map((value) => value.venue),
          artists: [],
        })
      : null
  }

  private toDTO(model: ConcertModel): ConcertDTO {
    const mainVenue = model.venues.at(0)
    const mainArtist = model.artists.at(0)
    return {
      id: model.id,
      title: model.title,
      date: model.date.toISOString(),
      mainPoster: mainArtist
        ? {
            url: mainArtist?.artistProfileImage.at(0)?.imageURL ?? '',
            copyright: mainArtist?.artistProfileImage.at(0)?.copyright ?? null,
          }
        : null,
      mainVenue: mainVenue
        ? {
            name: mainVenue.name,
          }
        : null,
    }
  }
}
