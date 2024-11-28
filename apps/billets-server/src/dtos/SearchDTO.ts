import { prisma } from '../prisma/connect'
import { SearchDTOProps, SearchDTOSerialized } from './SearchDTO.types'

export default class SearchDTO {
  props: SearchDTOProps

  constructor(props: SearchDTOProps) {
    this.props = props
  }

  static async searchList(keyword: string) {
    const artistData = await prisma.artist.findMany({
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
    })

    const venuesData = await prisma.venue.findMany({
      where: {
        name: {
          contains: keyword,
          mode: 'insensitive',
        },
      },
    })

    const concertData = await prisma.concert.findMany({
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
    })

    // 순서: artist -> venue -> concert

    const artists = artistData.map(
      (artist) =>
        new SearchDTO({
          type: 'artist',
          id: artist.id,
          name: artist.name,
          profileImgUrl: artist.artistProfileImage.at(0)?.imageURL ?? '',
        }),
    )

    const venues = venuesData.map(
      (venue) =>
        new SearchDTO({
          type: 'venue',
          id: venue.id,
          name: venue.name,
        }),
    )

    const concerts = concertData.map(
      (concert) =>
        new SearchDTO({
          type: 'concert',
          date: concert.date?.toISOString() ?? '',
          thumbnailImgUrl: concert.posters.at(0)?.poster.imageURL ?? '',
          title: concert.title,
          venueTitle: concert.venues.at(0)?.venue.name ?? '',
          id: concert.id,
        }),
    )

    return artists.concat(venues).concat(concerts)
  }

  serialize(): SearchDTOSerialized {
    return {
      ...this.props,
    }
  }
}
