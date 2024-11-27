import { FCMToken } from '@prisma/client'
import { prisma } from '../../prisma/connect'
import { FCMTokenDTOSerialized } from './FCMTokenDTO.types'

export class FCMTokenDTO {
  private props: Partial<FCMToken>
  constructor(props: Partial<FCMToken>) {
    this.props = props
  }

  public async create() {
    if (!this.props.tokenValue) {
      throw Error('invalid token value')
    }
    const data = await prisma.fCMToken.create({
      data: {
        tokenValue: this.props.tokenValue,
      },
    })
    return new FCMTokenDTO(data)
  }

  public async linkToUser(userId: string) {
    if (!this.props.id) {
      throw Error('invalid id')
    }
    const data = await prisma.usersOnFCMTokens.upsert({
      where: {
        userId_fcmTokenId: {
          userId,
          fcmTokenId: this.props.id,
        },
      },
      update: {
        updatedAt: new Date(),
      },
      create: {
        userId,
        fcmTokenId: this.props.id,
      },
      include: {
        fcmToken: true,
      },
    })
    return new FCMTokenDTO(data.fcmToken)
  }

  public static async findByTokenValue(token: string) {
    const data = await prisma.fCMToken.findUnique({
      where: {
        tokenValue: token,
      },
    })
    if (!data) {
      return null
    }
    return new FCMTokenDTO(data)
  }

  get tokenValue(): string | undefined {
    return this.props.tokenValue
  }

  public serialize(): FCMTokenDTOSerialized {
    if (!this.props.id) {
      throw Error('invalid id')
    }
    if (!this.props.tokenValue) {
      throw Error('invalid token value')
    }
    return {
      id: this.props.id,
      token: this.props.tokenValue,
    }
  }
}
