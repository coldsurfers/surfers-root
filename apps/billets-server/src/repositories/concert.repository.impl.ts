import {
  ConcertDTO,
  FindManyByArtistIdConcertDTO,
  FindManyByVenueIdConcertDTO,
  FindManyConcertDTO,
  SubscribeUnsubscribeConcertDTO,
} from '@/dtos/concert.dto'
import { dbClient } from '@/lib/db/db.client'
import { Concert } from '@prisma/client'
import { ConcertRepository } from './concert.repository'

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
      orderBy: {
        date: 'asc',
      },
      take: params.take,
      skip: params.skip,
    })

    return data.map(this.toDTO)
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
    })

    return data.map(this.toDTO)
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
    })

    return data.map(this.toDTO)
  }
  async findById(id: string): Promise<ConcertDTO | null> {
    const data = await dbClient.concert.findUnique({
      where: {
        id,
      },
    })

    return data ? this.toDTO(data) : null
  }

  async subscribe(params: SubscribeUnsubscribeConcertDTO): Promise<ConcertDTO> {
    const data = await dbClient.usersOnSubscribedConcerts.create({
      data: {
        userId: params.userId,
        concertId: params.concertId,
      },
      include: {
        concert: true,
      },
    })

    return this.toDTO(data.concert)
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
        concert: true,
      },
    })

    return this.toDTO(data.concert)
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
    return data ? this.toDTO(data.concert) : null
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
    return data.map((value) => this.toDTO(value.concert))
  }

  private toDTO(data: Concert): ConcertDTO {
    return {
      id: data.id,
      title: data.title,
      date: data.date ? data.date.toISOString() : null,
    }
  }
}
