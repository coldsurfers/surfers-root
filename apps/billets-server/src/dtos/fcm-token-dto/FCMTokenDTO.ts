import { FCMToken } from '@prisma/client'
import { prisma } from 'src/prisma/connect'
import { FCMTokenDTOSerialized } from './FCMTokenDTO.types'

export class FCMTokenDTO {
  private props: Partial<FCMToken>
  constructor(props: Partial<FCMToken>) {
    this.props = props
  }

  public async create() {
    if (!this.props.userId) {
      throw Error('invalid userId value')
    }
    if (!this.props.tokenValue) {
      throw Error('invalid token value')
    }
    const data = await prisma.fCMToken.create({
      data: {
        userId: this.props.userId,
        tokenValue: this.props.tokenValue,
      },
    })
    return new FCMTokenDTO(data)
  }

  get tokenValue(): string | undefined {
    return this.props.tokenValue
  }

  get userId(): string | undefined {
    return this.props.userId
  }

  public serialize(): FCMTokenDTOSerialized {
    if (!this.props.id) {
      throw Error('invalid id')
    }
    if (!this.props.userId) {
      throw Error('invalid userId')
    }
    if (!this.props.tokenValue) {
      throw Error('invalid token value')
    }
    return {
      id: this.props.id,
      userId: this.props.userId,
      token: this.props.tokenValue,
    }
  }
}
