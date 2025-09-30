import type { SearchDTO } from '@/dtos/search.dto';
import { supabase } from '@/lib/supabase';
import type { Json } from '@/lib/types/supabase-schema';
import type { SearchRepository } from './search.repository';

type SearchModel = SearchDTO;

function castPosters(value: Json): {
  id: string;
  imageURL: string;
}[] {
  return value as {
    id: string;
    imageURL: string;
  }[];
}

function castVenues(value: Json): {
  id: string;
  name: string;
}[] {
  return value as {
    id: string;
    name: string;
  }[];
}

export class SearchRepositoryImpl implements SearchRepository {
  async searchManyByKeyword(keyword: string): Promise<SearchDTO[]> {
    const { data, error } = await supabase.rpc('search_concerts_trgm', {
      q: keyword,
      limit_input: 50,
      offset_input: 0,
      city_id_input: undefined,
    });

    if (error) {
      throw error;
    }

    return data.map((item) => {
      return this.toDTO({
        type: 'concert',
        date: new Date(item.date).toISOString(),
        slug: item.slug,
        title: item.title,
        thumbnailImgUrl: castPosters(item.posters).at(0)?.imageURL ?? '',
        venueTitle: castVenues(item.venues).at(0)?.name ?? '',
        id: item.id,
      });
    });

    // const artistData = await dbClient.artist.findMany({
    //   where: {
    //     name: {
    //       contains: keyword,
    //       mode: 'insensitive',
    //     },
    //   },
    //   include: {
    //     artistProfileImage: {
    //       select: {
    //         imageURL: true,
    //       },
    //     },
    //   },
    // });

    // const venuesData = await dbClient.venue.findMany({
    //   where: {
    //     name: {
    //       contains: keyword,
    //       mode: 'insensitive',
    //     },
    //   },
    // });

    // const concertData = await dbClient.concert.findMany({
    //   where: {
    //     deletedAt: {
    //       equals: null,
    //     },
    //     date: {
    //       gte: new Date(),
    //     },
    //     OR: [
    //       {
    //         title: {
    //           contains: keyword,
    //           mode: 'insensitive',
    //         },
    //       },
    //       {
    //         artists: {
    //           some: {
    //             artist: {
    //               name: {
    //                 contains: keyword,
    //                 mode: 'insensitive',
    //               },
    //             },
    //           },
    //         },
    //       },
    //       {
    //         venues: {
    //           some: {
    //             venue: {
    //               name: {
    //                 contains: keyword,
    //                 mode: 'insensitive',
    //               },
    //             },
    //           },
    //         },
    //       },
    //     ],
    //   },
    //   include: {
    //     posters: {
    //       select: {
    //         poster: {
    //           select: {
    //             imageURL: true,
    //           },
    //         },
    //       },
    //     },
    //     venues: {
    //       select: {
    //         venue: {
    //           select: {
    //             name: true,
    //           },
    //         },
    //       },
    //     },
    //   },
    //   orderBy: {
    //     date: 'asc',
    //   },
    // });

    // // 순서: concert -> venue -> artist

    // const artists = artistData.map((artist) =>
    //   this.toDTO({
    //     type: 'artist',
    //     id: artist.id,
    //     name: artist.name,
    //     profileImgUrl: artist.artistProfileImage.at(0)?.imageURL ?? '',
    //   })
    // );

    // const venues = venuesData.map((venue) =>
    //   this.toDTO({
    //     type: 'venue',
    //     id: venue.id,
    //     name: venue.name,
    //     slug: venue.slug,
    //   })
    // );

    // const concerts = concertData.map((concert) =>
    //   this.toDTO({
    //     type: 'concert',
    //     date: concert.date?.toISOString() ?? '',
    //     thumbnailImgUrl: concert.posters.at(0)?.poster.imageURL ?? '',
    //     title: concert.title,
    //     venueTitle: concert.venues.at(0)?.venue.name ?? '',
    //     id: concert.id,
    //     slug: concert.slug,
    //   })
    // );

    // return concerts.concat(venues).concat(artists);
  }

  private toDTO(data: SearchModel): SearchDTO {
    return data;
  }
}
