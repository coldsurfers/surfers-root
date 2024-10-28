import { prisma } from '../prisma/connect'
import { ArtistDTOProps } from './ArtistDTO.types'

export default class ArtistDTO {
  constructor(private readonly props: ArtistDTOProps) {
    this.props = props
  }

  static async findById(id: string) {
    const artist = await prisma.artist.findUnique({
      where: {
        id,
      },
    })
    if (!artist) {
      return null
    }
    return new ArtistDTO(artist)
  }

  get id() {
    return this.props.id
  }
}
