import {
  ConcertDTO,
  FindManyByArtistIdConcertDTO,
  FindManyByVenueIdConcertDTO,
  FindManyConcertDTO,
  SubscribeUnsubscribeConcertDTO,
} from '@/dtos/concert.dto'
import { dbClient } from '@/lib/db/db.client'
import { Artist, ArtistProfileImage, Concert, Poster, Price, Ticket, Venue } from '@prisma/client'
import { ConcertRepository } from './concert.repository'

type ConcertModel = Partial<
  Concert & {
    posters: Partial<Poster>[]
  } & {
    venues: Partial<Venue>[]
  } & {
    artists: Partial<
      Artist & {
        artistProfileImage: Partial<ArtistProfileImage>[]
      }
    >[]
  } & {
    tickets: Partial<Ticket & { prices: Partial<Price>[] }>[]
  }
>

export class ConcertRepositoryImpl implements ConcertRepository {
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
      include: {
        posters: {
          select: {
            poster: true,
          },
        },
        venues: {
          select: {
            venue: true,
          },
        },
      },
      orderBy: {
        date: 'asc',
      },
      take: params.take,
      skip: params.skip,
    })

    return data.map((value) =>
      this.toDTO({
        ...value,
        posters: value.posters.map((posterValue) => posterValue.poster),
        venues: value.venues.map((venueValue) => venueValue.venue),
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
      include: {
        posters: {
          select: {
            poster: true,
          },
        },
        venues: {
          select: {
            venue: true,
          },
        },
      },
      orderBy: {
        createdAt: params.orderBy === 'latest' ? 'desc' : 'asc',
      },
      take: params.take,
      skip: params.skip,
    })

    return data.map((value) =>
      this.toDTO({
        ...value,
        posters: value.posters.map((posterValue) => posterValue.poster),
        venues: value.venues.map((venueValue) => venueValue.venue),
      }),
    )
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
      include: {
        posters: {
          select: {
            poster: true,
          },
        },
        venues: {
          select: {
            venue: true,
          },
        },
      },
      orderBy: {
        createdAt: params.orderBy === 'latest' ? 'desc' : 'asc',
      },
      take: params.take,
      skip: params.skip,
    })

    return data.map((value) =>
      this.toDTO({
        ...value,
        posters: value.posters.map((posterValue) => posterValue.poster),
        venues: value.venues.map((venueValue) => venueValue.venue),
      }),
    )
  }
  async findById(id: string): Promise<ConcertDTO | null> {
    const data = await dbClient.concert.findUnique({
      where: {
        id,
      },
      include: {
        posters: {
          select: { poster: true },
        },
        venues: {
          select: {
            venue: true,
          },
        },
        artists: {
          select: {
            artist: {
              include: {
                artistProfileImage: true,
              },
            },
          },
        },
        tickets: {
          select: {
            ticket: {
              include: {
                prices: {
                  include: {
                    price: {
                      select: {
                        id: true,
                        price: true,
                        priceCurrency: true,
                        title: true,
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

    return data
      ? this.toDTO({
          ...data,
          posters: data.posters.map((poster) => poster.poster),
          venues: data.venues.map((venue) => venue.venue),
          artists: data.artists.map((artist) => artist.artist),
          tickets: data.tickets.map((ticket) => ({
            ...ticket.ticket,
            prices: ticket.ticket.prices.map((price) => price.price),
          })),
        })
      : null
  }

  async subscribe(params: SubscribeUnsubscribeConcertDTO): Promise<ConcertDTO> {
    const data = await dbClient.usersOnSubscribedConcerts.create({
      data: {
        userId: params.userId,
        concertId: params.concertId,
      },
    })

    return this.toDTO(data)
  }

  async unsubscribe(params: SubscribeUnsubscribeConcertDTO): Promise<ConcertDTO> {
    const data = await dbClient.usersOnSubscribedConcerts.delete({
      where: {
        userId_concertId: {
          userId: params.userId,
          concertId: params.concertId,
        },
      },
    })

    return this.toDTO(data)
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
        concert: true,
      },
    })
    return data
      ? this.toDTO({
          ...data.concert,
        })
      : null
  }

  async findManySubscribedConcerts(params: { userId: string; take: number; skip: number }): Promise<ConcertDTO[]> {
    const data = await dbClient.usersOnSubscribedConcerts.findMany({
      where: {
        userId: params.userId,
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: params.take,
      skip: params.skip,
      include: {
        concert: true,
      },
    })
    return data.map((value) =>
      this.toDTO({
        ...value.concert,
      }),
    )
  }

  private toDTO(data: ConcertModel): ConcertDTO {
    return {
      id: data.id ?? '',
      title: data.title ?? '',
      date: data.date?.toISOString() ?? '',
      posters:
        data.posters?.map((poster) => ({
          imageUrl: poster.imageURL ?? '',
        })) ?? [],
      venues:
        data.venues?.map((venue) => ({
          id: venue.id ?? '',
          venueTitle: venue.name ?? '',
          latitude: venue.lat ?? 0.0,
          longitude: venue.lng ?? 0.0,
          address: venue.address ?? '',
        })) ?? [],
      artists:
        data.artists?.map((artist) => ({
          id: artist.id ?? '',
          name: artist.name ?? '',
          profileImageUrl: artist.artistProfileImage?.at(0)?.imageURL ?? '',
        })) ?? [],
      tickets:
        data.tickets?.map((ticket) => ({
          seller: ticket.seller ?? '',
          openDate: ticket.openDate?.toISOString() ?? '',
          url: ticket.sellingURL ?? '',
          prices:
            ticket.prices?.map((price) => {
              return {
                id: price.id ?? '',
                price: price.price ?? 0,
                currency: price.priceCurrency ?? '',
                title: price.title ?? '',
              }
            }) ?? [],
        })) ?? [],
    }
  }
}
