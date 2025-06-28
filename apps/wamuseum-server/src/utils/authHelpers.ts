import { GraphQLError } from 'graphql';
import type { GraphqlContext } from '../../gql/Context';
import StaffDTO from '../dtos/StaffDTO';
import UserDTO from '../dtos/UserDTO';

export async function authorizeUser(
  ctx: GraphqlContext,
  options: {
    requiredRole?: 'staff';
    email?: string;
  }
) {
  const { email } = options;
  let user: UserDTO | null = null;

  if (email) {
    user = await UserDTO.findByEmail(email);
    if (!user) {
      throw new GraphQLError('권한이 없습니다', {
        extensions: {
          code: 401,
        },
      });
    }
  } else {
    if (!ctx.token) {
      throw new GraphQLError('권한이 없습니다', {
        extensions: {
          code: 401,
        },
      });
    }
    user = await UserDTO.findByAccessToken(ctx.token);
    if (!user) {
      throw new GraphQLError('권한이 없습니다', {
        extensions: {
          code: 401,
        },
      });
    }
  }

  const { id: userId } = user.props;

  if (!userId) {
    throw new GraphQLError('권한이 없습니다', {
      extensions: {
        code: 401,
      },
    });
  }

  const { requiredRole } = options;
  let staff: StaffDTO | null = null;
  if (requiredRole) {
    if (requiredRole === 'staff') {
      staff = await StaffDTO.find({ userId });
      if (!staff || !staff.props.isAuthorized) {
        throw new GraphQLError('권한이 없습니다', {
          extensions: {
            code: 401,
          },
        });
      }
    }
  }

  return { user, staff };
}
