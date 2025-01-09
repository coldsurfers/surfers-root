import { dbClient } from '@/lib/db'
import { User } from '@prisma/client'
import { UserDTOSerialized } from './user-dto.types'

type UserDTOProps = Partial<User>

export class UserDTO {
  props: UserDTOProps

  constructor(props: UserDTOProps) {
    this.props = props
  }

  static async findByEmail(email: string) {
    const data = await dbClient.user.findUnique({
      where: {
        email,
      },
    })
    if (!data) return null
    return new UserDTO(data)
  }

  static async findById(id: string) {
    const data = await dbClient.user.findUnique({
      where: {
        id,
      },
    })
    if (!data) return null
    return new UserDTO(data)
  }

  async create() {
    if (!this.props.email || !this.props.provider) {
      throw Error('invalid email or provider')
    }
    const data = await dbClient.user.create({
      data: {
        email: this.props.email,
        provider: this.props.provider,
        password: this.props.password,
        passwordSalt: this.props.passwordSalt,
      },
    })

    return new UserDTO(data)
  }

  async activate() {
    if (!this.props.id) {
      throw Error('id invalid')
    }
    const data = await dbClient.user.update({
      where: {
        id: this.props.id,
      },
      data: {
        deactivatedAt: null,
      },
    })
    return new UserDTO(data)
  }

  async deactivate() {
    if (!this.props.id) {
      throw Error('id invalid')
    }
    const data = await dbClient.user.update({
      where: {
        id: this.props.id,
      },
      data: {
        deactivatedAt: new Date(),
      },
    })
    return new UserDTO(data)
  }

  get id(): string | undefined {
    return this.props.id
  }

  get deactivatedAt() {
    return this.props.deactivatedAt
  }

  serialize(): UserDTOSerialized {
    return {
      id: this.props.id ?? '',
      email: this.props.email ?? '',
      provider: this.props.provider ?? '',
      deactivatedAt: this.props.deactivatedAt ?? null,
    }
  }
}
