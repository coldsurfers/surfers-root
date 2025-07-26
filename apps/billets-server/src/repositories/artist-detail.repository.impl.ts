import type { ArtistDetailDTO } from '@/dtos/artist-detail.dto';
import { dbClient } from '@/lib/db';
import type { Artist, ArtistProfileImage, Concert, Copyright, Poster, Venue } from '@prisma/client';
import type { ArtistDetailRepository } from './artist-detail.repository';

interface ArtistDetailModel extends Artist {
  concerts: (Concert & {
    posters: Poster[];
    venues: Venue[];
  })[];
  artistProfileImage: (ArtistProfileImage & { copyright: Copyright | null })[];
}

export class ArtistDetailRepositoryImpl implements ArtistDetailRepository {
  async findArtistDetailById(id: string): Promise<ArtistDetailDTO | null> {
    const data = await dbClient.artist.findUnique({
      where: {
        id,
      },
      include: {
        artistProfileImage: {
          include: {
            copyright: true,
          },
        },
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
        };
      }),
    });
  }

  private toDTO(model: ArtistDetailModel): ArtistDetailDTO {
    const thumbUrl = model.artistProfileImage.at(0)?.imageURL ?? '';
    const thumbCopyright = model.artistProfileImage.at(0)?.copyright ?? null;
    return {
      id: model.id,
      name: model.name,
      thumbUrl,
      thumbCopyright: thumbCopyright,
      upcomingEvents: model.concerts.map((concert) => {
        const mainPoster = concert.posters.at(0);
        const mainVenue = concert.venues.at(0);
        return {
          type: 'concert',
          data: {
            id: concert.id,
            title: concert.title,
            date: concert.date.toISOString(),
            slug: concert.slug,
            mainPoster: mainPoster
              ? {
                  url: thumbUrl,
                  copyright: thumbCopyright,
                }
              : null,
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
