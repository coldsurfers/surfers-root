import { prisma } from '../../prisma/connect'
import { SubscribeConcertDTOProps, SubscribedConcertSerialized } from './subscribe-concert-dto.types'

export class SubscribeConcertDTO {
  props: SubscribeConcertDTOProps

  constructor(props: SubscribeConcertDTOProps) {
    this.props = props
  }

  static async list({ userId, take, skip }: { userId: string; take: number; skip: number }) {
    const data = await prisma.usersOnSubscribedConcerts.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: 'desc',
      },
      take,
      skip,
    })
    return data.map((value) => new SubscribeConcertDTO(value))
  }

  static async findByConcertIdUserId(concertId: string, userId: string) {
    const data = await prisma.usersOnSubscribedConcerts.findFirst({
      where: {
        userId,
        concertId,
      },
    })
    if (!data) {
      return null
    }
    return new SubscribeConcertDTO(data)
  }

  async subscribeConcert() {
    if (!this.props.userId || !this.props.concertId) {
      throw new Error('userId and concertId are required')
    }
    const data = await prisma.usersOnSubscribedConcerts.create({
      data: {
        userId: this.props.userId,
        concertId: this.props.concertId,
      },
    })

    return new SubscribeConcertDTO(data)
  }

  async unsubscribeConcert() {
    if (!this.props.userId || !this.props.concertId) {
      throw new Error('userId and concertId are required')
    }
    const data = await prisma.usersOnSubscribedConcerts.delete({
      where: {
        userId_concertId: {
          userId: this.props.userId,
          concertId: this.props.concertId,
        },
      },
    })
    return new SubscribeConcertDTO(data)
  }

  serialize(): SubscribedConcertSerialized {
    return {
      concertId: this.props.concertId ?? '',
      userId: this.props.userId ?? '',
    }
  }
}
