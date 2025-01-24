import { ArtistProfileImage } from '@prisma/client'
import { prisma } from '../../libs/db/db.utils'
import {
  ArtistProfileImageDTOSerialized,
  artistProfileImageDTOSerializedSchema,
} from './artist-profile-image-dto.types'

export class ArtistProfileImageDTO {
  private props: Partial<ArtistProfileImage>
  constructor(props: Partial<ArtistProfileImage>) {
    this.props = props
  }

  async create({ imageKey }: { imageKey: string }) {
    if (!this.props.artistId) {
      throw Error('invalid artistId')
    }
    const data = await prisma.artistProfileImage.create({
      data: {
        imageURL: `https://api.billets.coldsurf.io/v1/image?key=${imageKey}`,
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
