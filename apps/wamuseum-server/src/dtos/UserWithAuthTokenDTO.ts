/* eslint-disable camelcase */
import type { AuthToken, User } from '@prisma/client';
import type { UserWithAuthToken } from '../../gql/resolvers-types';
import { prisma } from '../libs/db/db.utils';

type UserWithAuthTokenDTOPropsType = Partial<AuthToken> & {
  user?: Partial<User>;
};

export default class UserWithAuthTokenDTO {
  props: UserWithAuthTokenDTOPropsType;

  constructor(props: UserWithAuthTokenDTOPropsType) {
    this.props = props;
  }

  async create({ userId }: { userId: string }) {
    const { access_token, refresh_token } = this.props;
    if (!access_token || !refresh_token) {
      throw Error('access token or refresh token is invalid');
    }
    const data = await prisma.authToken.create({
      data: {
        access_token,
        refresh_token,
        user_id: userId,
      },
      include: {
        user: true,
      },
    });

    return new UserWithAuthTokenDTO(data);
  }

  static async findByUserId(userId: string) {
    const data = await prisma.authToken.findFirst({
      where: {
        user_id: userId,
      },
    });
    if (!data) return null;
    return new UserWithAuthTokenDTO(data);
  }

  async delete() {
    await prisma.authToken.delete({
      where: {
        id: this.props.id,
      },
    });
  }

  serialize(): UserWithAuthToken {
    return {
      __typename: 'UserWithAuthToken',
      authToken: {
        __typename: 'AuthToken',
        accessToken: this.props.access_token ?? '',
        refreshToken: this.props.refresh_token ?? '',
      },
      user: {
        __typename: 'User',
        id: this.props.user?.id ?? '',
        email: this.props.user?.email ?? '',
      },
    };
  }
}
