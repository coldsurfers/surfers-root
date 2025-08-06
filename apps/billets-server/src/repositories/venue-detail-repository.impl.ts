import type { VenueDetailDTO } from '@/dtos/venue-detail-dto';
import { dbClient } from '@/lib/db';
import type {
  Artist,
  ArtistProfileImage,
  Concert,
  Copyright,
  KOPISEvent,
  Poster,
  Venue,
} from '@prisma/client';
import type { VenueDetailRepository } from './venue-detail-repository';

type VenueDetailConcertModel = Concert & {
  posters: Poster[];
  venues: Venue[];
  artists: (Artist & {
    artistProfileImage: (ArtistProfileImage & { copyright: Copyright | null })[];
  })[];
  kopisEvent: KOPISEvent | null;
};

interface VenueDetailModel extends Venue {
  concerts: VenueDetailConcertModel[];
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
              deletedAt: {
                equals: null,
              },
            },
          },
          include: {
            concert: {
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
            },
          },
        },
      },
    });
    if (!data) {
      return null;
    }
    return this.toDTO({
      ...data,
      concerts: data.concerts.map((concert) => {
        return {
          ...concert.concert,
          posters: concert.concert.posters.map((value) => value.poster),
          venues: concert.concert.venues.map((value) => value.venue),
          artists: concert.concert.artists.map((value) => value.artist),
          kopisEvent: concert.concert.kopisEvent,
        };
      }),
    });
  }

  async findVenueDetailByVenueSlug(slug: string): Promise<VenueDetailDTO | null> {
    const data = await dbClient.venue.findUnique({
      where: {
        slug,
      },
      include: {
        concerts: {
          where: {
            concert: {
              date: {
                gte: new Date(),
              },
              deletedAt: {
                equals: null,
              },
            },
          },
          include: {
            concert: {
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
            },
          },
        },
      },
    });
    if (!data) {
      return null;
    }
    return this.toDTO({
      ...data,
      concerts: data.concerts.map((concert) => {
        return {
          ...concert.concert,
          posters: concert.concert.posters.map((value) => value.poster),
          venues: concert.concert.venues.map((value) => value.venue),
          artists: concert.concert.artists.map((value) => value.artist),
          kopisEvent: concert.concert.kopisEvent,
        };
      }),
    });
  }

  private generateMainPoster(model: VenueDetailConcertModel) {
    if (model.kopisEvent) {
      const posterUrl = model.posters.at(0)?.imageURL ?? '';
      return {
        url: posterUrl,
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

  private toDTO(model: VenueDetailModel): VenueDetailDTO {
    return {
      id: model.id,
      name: model.name,
      address: model.address,
      lat: model.lat,
      lng: model.lng,
      slug: model.slug,
      memo: model.memo,
      upcomingEvents: model.concerts.map((concert) => {
        const mainVenue = concert.venues.at(0);
        return {
          type: 'concert',
          data: {
            id: concert.id,
            title: concert.title,
            date: concert.date.toISOString(),
            slug: concert.slug,
            mainPoster: this.generateMainPoster(concert),
            mainVenue: mainVenue
              ? {
                  name: mainVenue.name,
                }
              : null,
          },
        };
      }),
    };
  }
}
