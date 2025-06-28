import type { SearchDTO } from '@/dtos/search.dto';
import { dbClient } from '@/lib/db/db.client';
import type { SearchRepository } from './search.repository';

type SearchModel = SearchDTO;

export class SearchRepositoryImpl implements SearchRepository {
  async searchManyByKeyword(keyword: string): Promise<SearchDTO[]> {
    const artistData = await dbClient.artist.findMany({
      where: {
        name: {
          contains: keyword,
          mode: 'insensitive',
        },
      },
      include: {
        artistProfileImage: {
          select: {
            imageURL: true,
          },
        },
      },
    });

    const venuesData = await dbClient.venue.findMany({
      where: {
        name: {
          contains: keyword,
          mode: 'insensitive',
        },
      },
    });

    const concertData = await dbClient.concert.findMany({
      where: {
        deletedAt: {
          equals: null,
        },
        OR: [
          {
            title: {
              contains: keyword,
              mode: 'insensitive',
            },
          },
          {
            artists: {
              some: {
                artist: {
                  name: {
                    contains: keyword,
                    mode: 'insensitive',
                  },
                },
              },
            },
          },
          {
            venues: {
              some: {
                venue: {
                  name: {
                    contains: keyword,
                    mode: 'insensitive',
                  },
                },
              },
            },
          },
        ],
      },
      include: {
        posters: {
          select: {
            poster: {
              select: {
                imageURL: true,
              },
            },
          },
        },
        venues: {
          select: {
            venue: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });

    // 순서: artist -> venue -> concert

    const artists = artistData.map((artist) =>
      this.toDTO({
        type: 'artist',
        id: artist.id,
        name: artist.name,
        profileImgUrl: artist.artistProfileImage.at(0)?.imageURL ?? '',
      })
    );

    const venues = venuesData.map((venue) =>
      this.toDTO({
        type: 'venue',
        id: venue.id,
        name: venue.name,
      })
    );

    const concerts = concertData.map((concert) =>
      this.toDTO({
        type: 'concert',
        date: concert.date?.toISOString() ?? '',
        thumbnailImgUrl: concert.posters.at(0)?.poster.imageURL ?? '',
        title: concert.title,
        venueTitle: concert.venues.at(0)?.venue.name ?? '',
        id: concert.id,
        slug: concert.slug,
      })
    );

    return artists.concat(venues).concat(concerts);
  }

  private toDTO(data: SearchModel): SearchDTO {
    return data;
  }
}
