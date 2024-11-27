import { ArtistProfileImage } from '@prisma/client'
import { prisma } from '../..'
import {
  ArtistProfileImageDTOSerialized,
  artistProfileImageDTOSerializedSchema,
} from './artist-profile-image-dto.types'

export class ArtistProfileImageDTO {
  private props: Partial<ArtistProfileImage>
  constructor(props: Partial<ArtistProfileImage>) {
    this.props = props
  }

  async create() {
    if (!this.props.imageURL) {
      throw Error('invalid imageURL')
    }
    if (!this.props.artistId) {
      throw Error('invalid artistId')
    }
    const data = await prisma.artistProfileImage.create({
      data: {
        imageURL: this.props.imageURL,
        artistId: this.props.artistId,
      },
    })
    return new ArtistProfileImageDTO(data)
  }

  public serialize(): ArtistProfileImageDTOSerialized {
    const validation = artistProfileImageDTOSerializedSchema.safeParse(this.props)
    if (!validation.success) {
      throw validation.error
    }
    return validation.data
  }
}
