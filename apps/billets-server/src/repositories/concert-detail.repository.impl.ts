import { ConcertDetailDTO } from '@/dtos/concert.dto'
import { dbClient } from '@/lib/db'
import { Artist, ArtistProfileImage, Concert, Poster, Venue } from '@prisma/client'
import { ConcertDetailRepository } from './concert-detail.repository'

interface ConcertDetailModel extends Concert {
  posters: Poster[]
  venues: Venue[]
  artists: (Artist & { artistProfileImage: ArtistProfileImage[] })[]
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
                artistProfileImage: true,
              },
            },
          },
        },
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
    return this.toDTO({
      ...data,
      posters,
      venues,
      artists,
    })
  }

  private toDTO(model: ConcertDetailModel): ConcertDetailDTO {
    return {
      id: model.id,
      title: model.title,
      date: model.date.toISOString(),
      posters: model.posters.map((poster) => ({
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
        }
      }),
    }
  }
}
