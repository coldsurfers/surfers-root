import type {
  ConcertDTO,
  FindManyByArtistIdConcertDTO,
  FindManyByVenueIdConcertDTO,
  FindManyConcertDTO,
  SubscribeUnsubscribeConcertDTO,
} from '@/dtos/concert.dto';
import { dbClient } from '@/lib/db/db.client';
import type {
  Artist,
  ArtistProfileImage,
  Concert,
  Copyright,
  KOPISEvent,
  Poster,
  Venue,
} from '@prisma/client';
import dotenv from 'dotenv';
import type { ConcertRepository } from './concert.repository';

dotenv.config();

const { STATIC_SERVER_HOST: staticServerHost } = process.env;

interface ConcertModel extends Concert {
  posters: Poster[];
  venues: Venue[];
  artists: (Artist & {
    artistProfileImage: (ArtistProfileImage & { copyright: Copyright | null })[];
  })[];
  kopisEvent?: KOPISEvent | null;
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
    });
    if (!data) {
      return null;
    }
    const posters = data.posters.map((value) => value.poster);
    const venues = data.venues.map((value) => value.venue);
    return this.toDTO({
      ...data,
      posters,
      venues,
      artists: [],
    });
  }
  async findMany(params: FindManyConcertDTO): Promise<ConcertDTO[]> {
    const data = await dbClient.concert.findMany({
      where: {
        ...(params.locationCityName && {
          locationCity: {
            name: {
              mode: 'insensitive',
              equals: params.locationCityName,
            },
          },
        }),
        ...(params.eventCategoryName && {
          eventCategory: {
            name: {
              mode: 'insensitive',
              equals: params.eventCategoryName,
            },
          },
        }),
        ...(params.locationCityId && {
          locationCityId: params.locationCityId,
        }),
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
      distinct: ['id'],
      include: {
        kopisEvent: true,
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
    });

    return data.map((value) =>
      this.toDTO({
        ...value,
        posters: value.posters.map((value) => value.poster),
        venues: value.venues.map((value) => value.venue),
        artists: value.artists.map((value) => value.artist),
        kopisEvent: value.kopisEvent,
      })
    );
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
    });

    return data.map((value) => {
      return this.toDTO({
        ...value,
        posters: value.posters.map((value) => value.poster),
        venues: value.venues.map((value) => value.venue),
        artists: [],
      });
    });
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
    });

    return data.map((value) =>
      this.toDTO({
        ...value,
        posters: value.posters.map((value) => value.poster),
        venues: value.venues.map((value) => value.venue),
        artists: [],
      })
    );
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
    });

    return this.toDTO({
      ...data.concert,
      posters: data.concert.posters.map((value) => value.poster),
      venues: data.concert.venues.map((value) => value.venue),
      artists: [],
    });
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
    });

    return this.toDTO({
      ...data.concert,
      posters: data.concert.posters.map((value) => value.poster),
      venues: data.concert.venues.map((value) => value.venue),
      artists: [],
    });
  }

  async findSubscribedConcert(params: {
    userId: string;
    concertId: string;
  }): Promise<ConcertDTO | null> {
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
    });
    return data
      ? this.toDTO({
          ...data.concert,
          posters: data.concert.posters.map((value) => value.poster),
          venues: data.concert.venues.map((value) => value.venue),
          artists: [],
        })
      : null;
  }

  private generateMainPoster(model: ConcertModel) {
    if (model.kopisEvent) {
      const keyId = model.posters.at(0)?.keyId ?? '';
      return {
        url: `${staticServerHost}/${keyId}`,
        copyright: null,
      };
    }
    const mainArtist = model.artists.at(0);
    return mainArtist
      ? {
          url: mainArtist?.artistProfileImage.at(0)?.imageURL ?? '',
          copyright: mainArtist?.artistProfileImage.at(0)?.copyright ?? null,
        }
      : null;
  }

  private toDTO(model: ConcertModel): ConcertDTO {
    const mainVenue = model.venues.at(0);
    return {
      id: model.id,
      title: model.title,
      slug: model.slug,
      date: model.date.toISOString(),
      mainPoster: this.generateMainPoster(model),
      mainVenue: mainVenue
        ? {
            name: mainVenue.name,
          }
        : null,
    };
  }
}
