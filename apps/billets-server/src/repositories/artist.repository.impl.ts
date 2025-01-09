import { ArtistDTO } from '@/dtos/artist.dto'
import { dbClient } from '@/lib/db/db.client'
import { ArtistRepository } from './artist.repository'

interface ArtistModel {
  id: string
  name: string
  artistProfileImage: ({
    copyright: {
      id: string
      createdAt: Date
      owner: string
      license: string
      licenseURL: string
    } | null
  } & {
    id: string
    createdAt: Date
    imageURL: string
    artistId: string
    copyrightId: string | null
  })[]
}

export class ArtistRepositoryImpl implements ArtistRepository {
  async findById(id: string): Promise<ArtistDTO | null> {
    const artist = await dbClient.artist.findUnique({
      where: {
        id,
      },
      include: {
        artistProfileImage: {
          include: {
            copyright: true,
          },
        },
      },
    })
    return artist ? this.toDTO(artist) : null
  }

  private toDTO(artist: ArtistModel): ArtistDTO {
    return {
      id: artist.id,
      name: artist.name,
      artistProfileImage: artist.artistProfileImage.map((profileImage) => {
        return {
          id: profileImage.id,
          imageURL: profileImage.imageURL,
          copyright: profileImage.copyright,
        }
      }),
    }
  }
}
