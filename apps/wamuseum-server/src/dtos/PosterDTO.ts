import { Poster } from '@prisma/client'
import { prisma } from '..'
import { Poster as PosterResolver } from '../../gql/resolvers-types'

type PosterDTOProps = Partial<Poster>

export default class PosterDTO {
  props: PosterDTOProps

  constructor(props: PosterDTOProps) {
    this.props = props
  }

  static async findByConcertId(concertId: string) {
    const posters = await prisma.poster.findMany({
      where: {
        concerts: {
          some: {
            concertId,
          },
        },
      },
    })
    return posters.map((poster) => new PosterDTO(poster))
  }

  async create({ concertId }: { concertId: string }) {
    if (!this.props.imageURL) {
      throw Error('image url is invalid')
    }
    const poster = await prisma.poster.create({
      data: {
        imageURL: this.props.imageURL,
      },
    })
    const created = await prisma.concertsOnPosters.create({
      data: {
        concertId,
        posterId: poster.id,
      },
      include: {
        poster: true,
      },
    })
    return new PosterDTO({
      id: created.poster.id,
      imageURL: created.poster.imageURL,
    })
  }

  async update(data: { imageURL: string }) {
    const updated = await prisma.poster.update({
      where: {
        id: this.props.id,
      },
      data,
    })
    return new PosterDTO(updated)
  }

  serialize(): PosterResolver {
    return {
      __typename: 'Poster',
      id: this.props.id ?? '',
      imageURL: this.props.imageURL ?? '',
    }
  }
}
