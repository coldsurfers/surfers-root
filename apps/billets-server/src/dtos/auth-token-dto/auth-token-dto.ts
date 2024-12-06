import { prisma } from '../../prisma/connect'
import { AuthTokenDTOProps, AuthTokenDTOSerialized } from './auth-token-dto.types'

export class AuthTokenDTO {
  props: AuthTokenDTOProps

  constructor(props: AuthTokenDTOProps) {
    this.props = props
  }

  async create() {
    if (!this.props.access_token || !this.props.refresh_token || !this.props.user_id) {
      throw Error('invalid access_token or refresh_token or user_id')
    }
    const data = await prisma.authToken.create({
      data: {
        access_token: this.props.access_token,
        refresh_token: this.props.refresh_token,
        user_id: this.props.user_id,
      },
    })
    return new AuthTokenDTO(data)
  }

  serialize(): AuthTokenDTOSerialized {
    return {
      accessToken: this.props.access_token ?? '',
      refreshToken: this.props.refresh_token ?? '',
    }
  }
}
