import encryptPassword from '@/lib/encryptPassword';
import type { RouteGenericInterface } from 'fastify/types/route';
import { match } from 'ts-pattern';

import createEmailAuthCode from '@/lib/createEmailAuthCode';
import { googleOAuth2Client } from '@/lib/google-oauth2-client';
import { sendEmail } from '@/lib/mailer';
import { app } from '@/server';
import type { FastifyReply, FastifyRequest } from 'fastify';

import type {
  ReissueTokenBodyDTO,
  SignInBodyDTO,
  SignUpBodyDTO,
  UserWithAuthTokenDTO,
} from '@/dtos/auth.dto';
import type {
  ConfirmAuthCodeBodyDTO,
  ConfirmAuthCodeResponseDTO,
  SendAuthCodeResponseDTO,
  SendEmailAuthCodeBodyDTO,
} from '@/dtos/email-auth-request.dto';
import type { ErrorResponseDTO } from '@/dtos/error-response.dto';
import log from '@/lib/log';
import { getGoogleOAuthAudienceClientId } from '@/lib/utils/utils.google-auth';
import { type JwtPayload, generateAuthToken } from '@/lib/utils/utils.jwt';
import { verifyAppleIdToken } from '@/lib/verifyAppleToken';
import { AuthTokenRepositoryImpl } from '@/repositories/auth-token.repository.impl';
import { EmailAuthRequestRepositoryImpl } from '@/repositories/email-auth-request.repository.impl';
import { UserRepositoryImpl } from '@/repositories/user.repository.impl';
import { AuthTokenService } from '@/services/auth-token.service';
import { EmailAuthRequestService } from '@/services/email-auth-request.service';
import { UserService } from '@/services/user.service';
import { SERVICE_NAME } from '@coldsurfers/shared-utils';
import { differenceInMinutes } from 'date-fns/differenceInMinutes';
import dotenv from 'dotenv';

dotenv.config();

const userRepository = new UserRepositoryImpl();
const userService = new UserService(userRepository);

const authTokenRepository = new AuthTokenRepositoryImpl();
const authTokenService = new AuthTokenService(authTokenRepository);

const emailAuthRequestRepository = new EmailAuthRequestRepositoryImpl();
const emailAuthRequestService = new EmailAuthRequestService(emailAuthRequestRepository);

interface PostSignInRoute extends RouteGenericInterface {
  Body: SignInBodyDTO;
  Reply: {
    200: UserWithAuthTokenDTO;
    400: ErrorResponseDTO;
    401: ErrorResponseDTO;
    404: ErrorResponseDTO;
    500: ErrorResponseDTO;
  };
}

export const signinHandler = async (
  req: FastifyRequest<PostSignInRoute>,
  rep: FastifyReply<PostSignInRoute>
) => {
  const { email, password, provider, token, platform = 'ios' } = req.body;

  try {
    return await match(provider)
      .with('email', async () => {
        // const existing = await UserDTO.findByEmail(email)
        const existing = await userService.getUserByEmail(email);
        if (!existing) {
          return rep.status(404).send({
            code: 'USER_NOT_FOUND',
            message: 'user not found',
          });
        }
        const passwordSalt = await userService.getUserPasswordSalt(existing.id);
        if (!password || !passwordSalt) {
          return rep.status(400).send({
            code: 'INVALID_USER',
            message: 'invalid user',
          });
        }
        const { encrypted } = encryptPassword({
          plain: password,
          originalSalt: passwordSalt,
        });
        const userPassword = await userService.getUserPassword(existing.id);
        if (encrypted !== userPassword) {
          return rep.status(401).send({
            code: 'PASSWORD_NOT_MATCH',
            message: 'password not match',
          });
        }

        const authToken = generateAuthToken(existing.id);
        const createdAuthToken = await authTokenService.create({
          access_token: authToken.accessToken,
          refresh_token: authToken.refreshToken,
          user_id: existing.id,
        });
        return rep.status(200).send({
          user: existing,
          authToken: createdAuthToken,
        });
      })
      .otherwise(async (value) => {
        if (!token) {
          return rep.status(400).send({
            code: 'ACCESS_TOKEN_NOT_FOUND',
            message: 'access token not found',
          });
        }
        const existing = await userService.getUserByEmail(email);
        if (!existing) {
          return rep.status(404).send({
            code: 'USER_NOT_FOUND',
            message: 'user not found',
          });
        }
        if (value === 'google') {
          const audience = getGoogleOAuthAudienceClientId(platform);

          await googleOAuth2Client.verifyIdToken({
            idToken: token,
            audience,
          });
        }
        if (value === 'apple') {
          const clientId =
            platform === 'web'
              ? process.env.COLDSURF_IO_APPLE_BUNDLE_ID
              : process.env.BILLETS_APP_APPLE_BUNDLE_ID;
          await verifyAppleIdToken(token, clientId ?? '');
        }

        const authToken = generateAuthToken(existing.id);
        const createdAuthToken = await authTokenService.create({
          access_token: authToken.accessToken,
          refresh_token: authToken.refreshToken,
          user_id: existing.id,
        });
        return rep.status(200).send({
          user: existing,
          authToken: createdAuthToken,
        });
      });
  } catch (e) {
    console.error(e);
    return rep.status(500).send({
      code: 'UNKNOWN',
      message: 'unknown error',
    });
  }
};

interface SignInPreHandlerRoute extends RouteGenericInterface {
  Body: SignInBodyDTO;
  Reply: {
    200: UserWithAuthTokenDTO;
    401: ErrorResponseDTO;
    500: ErrorResponseDTO;
  };
}

export const signinPreHandler = async (
  req: FastifyRequest<SignInPreHandlerRoute>,
  rep: FastifyReply<SignInPreHandlerRoute>
) => {
  try {
    const { provider, email } = req.body;
    const existing = await userService.getUserByEmail(email);
    if (existing?.deactivatedAt) {
      return rep.status(401).send({
        code: 'USER_DEACTIVATED',
        message: 'this account was deactivated',
      });
    }
    if (provider !== 'email') {
      if (!existing) {
        const res = await app.inject({
          method: 'POST',
          url: '/v1/auth/signup',
          payload: req.body,
        });
        return rep.status(res.statusCode as 200 | 401 | 500).send(res.json());
      }
    }
  } catch (e) {
    console.error(e);
    return rep.status(500).send({
      code: 'UNKNOWN',
      message: 'unknown error',
    });
  }
};

interface PostSignUpRoute extends RouteGenericInterface {
  Body: SignUpBodyDTO;
  Reply: {
    201: UserWithAuthTokenDTO;
    400: ErrorResponseDTO;
    401: ErrorResponseDTO;
    500: ErrorResponseDTO;
  };
}

export const signupHandler = async (
  req: FastifyRequest<PostSignUpRoute>,
  rep: FastifyReply<PostSignUpRoute>
) => {
  try {
    const { provider, email, password, token, platform = 'ios' } = req.body;
    return await match(provider)
      .with('email', async () => {
        if (!password) {
          return rep.status(400).send();
        }

        if (password.length < 8 || password.length > 30) {
          return rep.status(400).send({
            code: 'INVALID_PASSWORD',
            message: '비밀번호의 길이는 최소 8자 이상, 최대 30자까지만 가능해요',
          });
        }
        // eslint-disable-next-line prefer-regex-literals
        const regex = new RegExp(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,30}$/
        );
        if (!regex.test(password)) {
          return rep.status(400).send({
            code: 'INVALID_PASSWORD',
            message: '비밀번호는 최소 1개 이상의 대소문자와 숫자, 특수문자를 포함해야 해요',
          });
        }

        const { encrypted, salt } = encryptPassword({
          plain: password,
          originalSalt: undefined,
        });
        // const userDTO = new UserDTO({
        //   email,
        //   provider: 'email',
        //   password: encrypted,
        //   passwordSalt: salt,
        // })
        // const created = await userDTO.create()
        const createdUser = await userService.createUser({
          email,
          provider: 'email',
          password: encrypted,
          passwordSalt: salt,
          handle: await userRepository.createUserHandleByEmail(email),
        });
        if (!createdUser) {
          return rep.status(400).send();
        }
        const authToken = generateAuthToken(createdUser.id);
        const createdAuthToken = await authTokenService.create({
          access_token: authToken.accessToken,
          refresh_token: authToken.refreshToken,
          user_id: createdUser.id,
        });
        return rep.status(201).send({
          user: createdUser,
          authToken: createdAuthToken,
        });
      })
      .otherwise(async (value) => {
        if (!token) {
          return rep.status(400).send();
        }
        if (value === 'google') {
          const audience = getGoogleOAuthAudienceClientId(platform);

          await googleOAuth2Client.verifyIdToken({
            idToken: token,
            audience,
          });
        }
        if (value === 'apple') {
          await verifyAppleIdToken(token, process.env.BILLETS_APP_APPLE_BUNDLE_ID ?? '');
        }
        //
        // const userDTO = new UserDTO({
        //   email,
        //   provider,
        // })
        const createdUser = await userService.createUser({
          email,
          provider,
          handle: await userRepository.createUserHandleByEmail(email),
        });
        if (!createdUser.id) {
          return rep.status(400).send();
        }
        const authToken = generateAuthToken(createdUser.id);
        const createdAuthToken = await authTokenService.create({
          access_token: authToken.accessToken,
          refresh_token: authToken.refreshToken,
          user_id: createdUser.id,
        });
        return rep.status(201).send({
          user: createdUser,
          authToken: createdAuthToken,
        });
      });
  } catch (e) {
    console.error(e);
    return rep.status(500).send({
      code: 'UNKNOWN',
      message: 'internal server error',
    });
  }
};

interface SignUpPreHandlerRoute extends RouteGenericInterface {
  Body: SignUpBodyDTO;
  Reply: {
    401: ErrorResponseDTO;
    500: ErrorResponseDTO;
  };
}

export const signupPreHandler = async (
  req: FastifyRequest<SignUpPreHandlerRoute>,
  rep: FastifyReply<SignUpPreHandlerRoute>
) => {
  try {
    const { email } = req.body;
    const user = await userService.getUserByEmail(email);
    if (user?.deactivatedAt) {
      return rep.status(401).send({
        code: 'USER_DEACTIVATED',
        message: 'this account was deactivated',
      });
    }
  } catch (e) {
    console.error(e);
    return rep.status(500).send({
      code: 'UNKNOWN',
      message: 'internal server error',
    });
  }
};

interface SendAuthCodeRoute extends RouteGenericInterface {
  Body: SendEmailAuthCodeBodyDTO;
  Reply: {
    200: SendAuthCodeResponseDTO;
    409: ErrorResponseDTO;
    500: ErrorResponseDTO;
  };
}

export const sendAuthCodeHandler = async (
  req: FastifyRequest<SendAuthCodeRoute>,
  rep: FastifyReply<SendAuthCodeRoute>
) => {
  const { email } = req.body;

  try {
    const authcode = createEmailAuthCode();
    const created = await emailAuthRequestService.create(email, authcode);
    const send = await sendEmail({
      from: process.env.BILLETS_SERVER_MAILER_EMAIL_ADDRESS,
      smtpOptions: {
        service: process.env.BILLETS_SERVER_MAILER_SERVICE,
        auth: {
          user: process.env.BILLETS_SERVER_MAILER_EMAIL_ADDRESS,
          pass: process.env.BILLETS_SERVER_MAILER_EMAIL_APP_PASSWORD,
        },
      },
      to: created.email ?? '',
      subject: `${SERVICE_NAME} 이메일 인증 번호`,
      html: `${SERVICE_NAME}의 이메일 인증 번호는 ${created.authcode ?? ''}입니다. 3분내에 입력 해 주세요.`,
    });
    console.log(send);
    return rep.status(200).send({
      email: created.email,
    });
  } catch (e) {
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    log((e as any).toString());
    return rep.status(500).send({
      code: 'UNKNOWN',
      message: 'internal server error',
    });
  }
};

interface ConfirmAuthCodeRoute extends RouteGenericInterface {
  Body: ConfirmAuthCodeBodyDTO;
  Reply: {
    200: ConfirmAuthCodeResponseDTO;
    401: ErrorResponseDTO;
    404: ErrorResponseDTO;
    409: ErrorResponseDTO;
    500: ErrorResponseDTO;
  };
}

export const confirmAuthCodeHandler = async (
  req: FastifyRequest<ConfirmAuthCodeRoute>,
  rep: FastifyReply<ConfirmAuthCodeRoute>
) => {
  try {
    const { authCode, email } = req.body;
    const dto = await emailAuthRequestService.findByEmail(email);
    if (!dto) {
      return rep.status(404).send({
        code: 'EMAIL_AUTH_REQUEST_NOT_FOUND',
        message: 'email auth request not found',
      });
    }
    if (dto.email !== email || dto.authcode !== authCode) {
      return rep.status(401).send({
        code: 'INVALID_EMAIL_AUTH_REQUEST',
        message: 'invalid email auth request',
      });
    }
    if (dto.authenticated) {
      return rep.status(409).send({
        code: 'EMAIL_AUTH_REQUEST_ALREADY_AUTHENTICATED',
        message: 'already authenticated',
      });
    }
    if (dto.createdAt) {
      const diffMinutes = Math.abs(differenceInMinutes(new Date(), dto.createdAt));
      if (diffMinutes >= 3) {
        return rep.status(401).send({
          code: 'EMAIL_AUTH_REQUEST_TIMEOUT',
          message: 'email auth request time out',
        });
      }
    }
    const confirmed = await emailAuthRequestService.confirm(dto.id);
    return rep.status(200).send({
      email: confirmed.email ?? '',
    });
  } catch (e) {
    console.error(e);
    return rep.status(500).send({
      code: 'UNKNOWN',
      message: 'internal server error',
    });
  }
};

interface ReissueTokenRoute extends RouteGenericInterface {
  Body: ReissueTokenBodyDTO;
  Reply: {
    200: UserWithAuthTokenDTO;
    400: ErrorResponseDTO;
    500: ErrorResponseDTO;
  };
}

export const reissueTokenHandler = async (
  req: FastifyRequest<ReissueTokenRoute>,
  rep: FastifyReply<ReissueTokenRoute>
) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      return rep.status(400).send({
        code: 'REFRESH_TOKEN_NOT_FOUND',
        message: 'refresh token not found',
      });
    }
    app.jwt.verify(refreshToken);

    const jwtPayload = app.jwt.decode<JwtPayload>(refreshToken);
    if (!jwtPayload?.id) {
      return rep.status(400).send({
        code: 'REFRESH_TOKEN_NOT_FOUND',
        message: 'refresh token not found',
      });
    }

    const user = await userService.getUserById(jwtPayload.id);

    if (!user) {
      return rep.status(400).send({
        code: 'REFRESH_TOKEN_NOT_FOUND',
        message: 'refresh token not found',
      });
    }

    const authToken = generateAuthToken(jwtPayload.id);

    const createdAuthToken = await authTokenService.create({
      access_token: authToken.accessToken,
      refresh_token: authToken.refreshToken,
      user_id: jwtPayload.id,
    });

    return rep.status(200).send({
      authToken: createdAuthToken,
      user,
    });
  } catch (e) {
    console.error('my error', e);
    return rep.status(500).send({
      code: 'UNKNOWN',
      message: 'internal server error',
    });
  }
};
