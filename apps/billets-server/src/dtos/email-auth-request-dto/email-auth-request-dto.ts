import { dbClient } from '@/lib/db'
import { EmailAuthRequestDTOProps } from './email-auth-request-dto.types'

export class EmailAuthRequestDTO {
  props: EmailAuthRequestDTOProps

  constructor(props: EmailAuthRequestDTOProps) {
    this.props = props
  }

  async create() {
    const { email, authcode } = this.props
    if (!email || !authcode) {
      throw Error('invalid email or authcode')
    }
    const data = await dbClient.emailAuthRequest.create({
      data: {
        email,
        authcode,
      },
    })
    return new EmailAuthRequestDTO(data)
  }

  static async findByEmail(email: string) {
    const data = await dbClient.emailAuthRequest.findFirst({
      where: {
        email,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })
    if (!data) return null
    return new EmailAuthRequestDTO(data)
  }

  async confirm() {
    const { id } = this.props
    if (!id) {
      console.error('invalid id')
      throw Error('invalid id')
    }
    const data = await dbClient.emailAuthRequest.update({
      where: {
        id,
      },
      data: {
        authenticated: true,
        authenticatedAt: new Date(),
      },
    })
    return new EmailAuthRequestDTO(data)
  }
}
