import { User } from '@prisma/client'
import { prisma } from '../prisma/connect'
import { UserDTOSerialized } from './UserDTO.types'

type UserDTOProps = Partial<User>

export default class UserDTO {
  props: UserDTOProps

  constructor(props: UserDTOProps) {
    this.props = props
  }

  static async findByEmail(email: string) {
    const data = await prisma.user.findUnique({
      where: {
        email,
      },
    })
    if (!data) return null
    return new UserDTO(data)
  }

  static async findById(id: string) {
    const data = await prisma.user.findUnique({
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
    const data = await prisma.user.create({
      data: {
        email: this.props.email,
        provider: this.props.provider,
        password: this.props.password,
        passwordSalt: this.props.passwordSalt,
      },
    })

    return new UserDTO(data)
  }

  serialize(): UserDTOSerialized {
    return {
      id: this.props.id ?? '',
      email: this.props.email ?? '',
      provider: this.props.provider ?? '',
    }
  }
}
