import { prisma } from '../prisma/connect'
import { ArtistDTOProps, ArtistDTOSerialized, artistDTOSerializedSchema } from './ArtistDTO.types'

export default class ArtistDTO {
  constructor(private readonly props: ArtistDTOProps) {
    this.props = props
  }

  static async findById(id: string) {
    const artist = await prisma.artist.findUnique({
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
    if (!artist) {
      return null
    }
    return new ArtistDTO({
      ...artist,
      artistProfileImage: artist.artistProfileImage.map((profileImage) => {
        return {
          ...profileImage,
          copyright: profileImage.copyright,
        }
      }),
    })
  }

  get id() {
    return this.props.id
  }

  public serialize(): ArtistDTOSerialized {
    const validation = artistDTOSerializedSchema.safeParse(this.props)
    if (!validation.success) {
      throw validation.error
    }
    return validation.data
  }
}
