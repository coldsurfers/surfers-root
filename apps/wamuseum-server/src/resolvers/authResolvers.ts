import { addMinutes, isAfter } from 'date-fns';
import { GraphQLError } from 'graphql';
import type { Resolvers } from '../../gql/resolvers-types';
import EmailAuthRequestDTO from '../dtos/EmailAuthRequestDTO';
import UserDTO from '../dtos/UserDTO';
import UserWithAuthTokenDTO from '../dtos/UserWithAuthTokenDTO';
import { authorizeUser } from '../utils/authHelpers';
import encryptPassword from '../utils/encryptPassword';
import { generateToken } from '../utils/generateToken';
import { sendEmail } from '../utils/mailer';

const authResolvers: Resolvers = {
  Mutation: {
    tokenRefresh: async (_, args) => {
      const { refreshToken } = args.input;
      const user = await UserDTO.findByAccessToken(refreshToken);
      if (!user?.props.id) {
        throw new GraphQLError('not found user id', {
          extensions: {
            code: 404,
          },
        });
      }
      const userWithAuthTokenDTO = new UserWithAuthTokenDTO({
        access_token: generateToken({
          id: user.props.id,
        }),
        refresh_token: generateToken({
          id: user.props.id,
        }),
      });
      const created = await userWithAuthTokenDTO.create({
        userId: user.props.id,
      });
      return created.serialize();
    },
    login: async (_, args, ctx) => {
      const { email, password } = args.input;
      const { user: authorizedUser } = await authorizeUser(ctx, {
        email,
        requiredRole: 'staff',
      });

      const { encrypted } = encryptPassword({
        plain: password,
        originalSalt: authorizedUser.props.passwordSalt ?? undefined,
      });
      if (encrypted !== authorizedUser.props.password) {
        return {
          __typename: 'HttpError',
          code: 401,
          message: '이메일이나 비밀번호가 일치하지 않습니다.',
        };
      }
      if (!authorizedUser.props.id) {
        throw new GraphQLError('not found user id', {
          extensions: {
            code: 404,
          },
        });
      }
      const userWithAuthTokenDTO = new UserWithAuthTokenDTO({
        access_token: generateToken({
          id: authorizedUser.props.id,
        }),
        refresh_token: generateToken({
          id: authorizedUser.props.id,
        }),
      });
      const created = await userWithAuthTokenDTO.create({
        userId: authorizedUser.props.id,
      });
      return created.serialize();
    },
    logout: async (_, _args, ctx) => {
      const { user } = await authorizeUser(ctx, { requiredRole: 'staff' });
      if (!user.props.id) {
        throw new GraphQLError('not found user id', {
          extensions: {
            code: 404,
          },
        });
      }
      const authToken = await UserWithAuthTokenDTO.findByUserId(user.props.id);
      if (!authToken) {
        throw new GraphQLError('권한이 없습니다', {
          extensions: {
            code: 401,
          },
        });
      }
      await authToken.delete();
      return user.serialize();
    },
    createEmailAuthRequest: async (_, args) => {
      const { email } = args.input;
      const emailAuthRequestDTO = new EmailAuthRequestDTO({
        email,
      });
      const createdEmailAuthRequest = await emailAuthRequestDTO.create();
      await sendEmail({
        to: createdEmailAuthRequest.props.email,
        subject: 'Wamuseum 이메일 인증 번호',
        html: `Wamuseum의 이메일 인증 번호는 ${createdEmailAuthRequest.props.authcode}입니다. 3분내에 입력 해 주세요.`,
        smtpOptions: {
          service: process.env.WAMUSEUM_SERVER_MAILER_SERVICE,
          auth: {
            user: process.env.WAMUSEUM_SERVER_MAILER_EMAIL_ADDRESS,
            pass: process.env.WAMUSEUM_SERVER_MAILER_EMAIL_APP_PASSWORD,
          },
        },
      });
      return createdEmailAuthRequest.serialize();
    },
    authenticateEmailAuthRequest: async (_, args) => {
      const { email, authcode } = args.input;
      const latest = await EmailAuthRequestDTO.findLatest(email);
      if (!latest) {
        return {
          __typename: 'HttpError',
          code: 404,
          message: '이메일 인증 요청을 다시 시도해주세요.',
        };
      }
      if (latest.props.authenticated) {
        return {
          __typename: 'HttpError',
          code: 409,
          message: '이미 인증 되었습니다.',
        };
      }
      if (!latest.props.createdAt) {
        return {
          __typename: 'HttpError',
          code: 400,
          message: 'invalid createdAt value',
        };
      }
      if (
        isAfter(new Date(latest.props.createdAt), addMinutes(new Date(latest.props.createdAt), 3))
      ) {
        return {
          __typename: 'HttpError',
          code: 410,
          message: '인증 시간이 만료되었습니다.',
        };
      }

      if (!latest.props.id) {
        return {
          __typename: 'HttpError',
          code: 400,
          message: 'invalid id value',
        };
      }

      if (authcode === latest.props.authcode) {
        const result = await latest.update({
          authenticated: true,
          id: latest.props.id,
        });
        return result.serialize();
      }

      return {
        __typename: 'HttpError',
        code: 401,
        message: '유효하지 않은 인증번호 입니다.',
      };
    },
  },
};

export default authResolvers;
