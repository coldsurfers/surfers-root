import { ConcertDetailDTO } from '@/dtos/concert.dto'
import { dbClient } from '@/lib/db'
import { Artist, ArtistProfileImage, Concert, Copyright, KOPISEvent, Poster, Ticket, Venue } from '@prisma/client'
import { ConcertDetailRepository } from './concert-detail.repository'

interface ConcertDetailModel extends Concert {
  posters: Poster[]
  venues: Venue[]
  artists: (Artist & { artistProfileImage: (ArtistProfileImage & { copyright: Copyright | null })[] })[]
  kopisEvent: KOPISEvent | null
  tickets: Ticket[]
}

export class ConcertDetailRepositoryImpl implements ConcertDetailRepository {
  async getConcertDetailById(id: string): Promise<ConcertDetailDTO | null> {
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
        tickets: {
          include: {
            ticket: true,
          },
        },
        kopisEvent: true,
      },
    })
    if (!data) {
      return null
    }
    const posters = data.posters.map((value) => value.poster)
    const venues = data.venues.map((value) => value.venue)
    const artists = data.artists.map((value) => ({
      ...value.artist,
      artistProfileImage: value.artist.artistProfileImage,
    }))
    const tickets = data.tickets.map((value) => value.ticket)
    return this.toDTO({
      ...data,
      posters,
      venues,
      artists,
      tickets,
    })
  }

  private toDTO(model: ConcertDetailModel): ConcertDetailDTO {
    return {
      id: model.id,
      title: model.title,
      date: model.date.toISOString(),
      posters: model.posters.map((poster) => ({
        id: poster.id,
        url: poster.imageURL,
      })),
      venues: model.venues.map((venue) => ({
        id: venue.id,
        name: venue.name,
        address: venue.address,
        lat: venue.lat,
        lng: venue.lng,
      })),
      artists: model.artists.map((artist) => {
        const artistProfileImage = artist.artistProfileImage.at(0)
        return {
          id: artist.id,
          name: artist.name,
          thumbUrl: artistProfileImage ? artistProfileImage.imageURL : null,
          thumbCopyright: artistProfileImage?.copyright ?? null,
        }
      }),
      tickets: model.tickets.map((ticket) => ({
        id: ticket.id,
        openDate: ticket.openDate.toISOString(),
        prices: [],
        sellerName: ticket.seller,
        url: ticket.sellingURL,
      })),
      isKOPIS: !!model.kopisEvent,
    }
  }
}
