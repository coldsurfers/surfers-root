import { prisma } from '../prisma/connect'
import { ConcertDTOProps, ConcertDTOSerialized } from './ConcertDTO.types'

export default class ConcertDTO {
  props: ConcertDTOProps

  constructor(props: ConcertDTOProps) {
    this.props = props
  }

  static async list({
    titleContains,
    orderBy,
    take,
    skip,
    venueGeohash,
  }: {
    titleContains?: string
    orderBy: 'latest' | 'oldest'
    take: number
    skip: number
    venueGeohash: string | null
  }) {
    const data = await prisma.concert.findMany({
      where: {
        ...(titleContains && {
          title: {
            contains: titleContains,
          },
        }),
        ...(venueGeohash && {
          venues: {
            some: {
              venue: {
                geohash: {
                  startsWith: venueGeohash,
                },
              },
            },
          },
        }),
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
        createdAt: orderBy === 'latest' ? 'desc' : 'asc',
      },
      take,
      skip,
    })

    return data.map(
      (value) =>
        new ConcertDTO({
          ...value,
          posters: value.posters.map((posterValue) => posterValue.poster),
          venues: value.venues.map((venueValue) => venueValue.venue),
        }),
    )
  }

  static async findById(id: string) {
    const data = await prisma.concert.findUnique({
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
                    price: true,
                  },
                },
              },
            },
          },
        },
      },
    })
    if (!data) return null
    return new ConcertDTO({
      ...data,
      posters: data.posters.map((poster) => poster.poster),
      venues: data.venues.map((venue) => venue.venue),
      artists: data.artists.map((artist) => artist.artist),
      tickets: data.tickets.map((ticket) => ({
        ...ticket.ticket,
      })),
    })
  }

  serialize(): ConcertDTOSerialized {
    return {
      id: this.props.id ?? '',
      title: this.props.title ?? '',
      date: this.props.date?.toISOString() ?? '',
      posters:
        this.props.posters?.map((poster) => ({
          imageUrl: poster.imageURL ?? '',
        })) ?? [],
      venues:
        this.props.venues?.map((venue) => ({
          venueTitle: venue.name ?? '',
        })) ?? [],
      artists:
        this.props.artists?.map((artist) => ({
          name: artist.name ?? '',
          profileImageUrl: artist.artistProfileImage?.at(0)?.imageURL ?? '',
        })) ?? [],
      tickets:
        this.props.tickets?.map((ticket) => ({
          openDate: ticket.openDate?.toISOString() ?? '',
          url: ticket.sellingURL ?? '',
          formattedPrice: `${ticket.price?.priceCurrency}${ticket.price?.price}`,
        })) ?? [],
    }
  }
}
