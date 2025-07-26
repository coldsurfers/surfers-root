import type { ErrorResponseDTO } from '@/dtos/error-response.dto';
import type { GetUserProfileByHandleParamsDTO, UserProfileDTO } from '@/dtos/user-profile.dto';
import type {
  ActivateUserBodyDTO,
  DeactivateUserBodyDTO,
  UserDTO,
  UserHandleDTO,
} from '@/dtos/user.dto';
import { EmailAuthRequestRepositoryImpl } from '@/repositories/email-auth-request.repository.impl';
import { UserProfileRepositoryImpl } from '@/repositories/user-profile.repository.impl';
import { UserRepositoryImpl } from '@/repositories/user.repository.impl';
import { EmailAuthRequestService } from '@/services/email-auth-request.service';
import { UserProfileService } from '@/services/user-profile.service';
import { UserService } from '@/services/user.service';
import { differenceInMinutes } from 'date-fns/differenceInMinutes';
import type { FastifyReply } from 'fastify/types/reply';
import type { FastifyRequest } from 'fastify/types/request';
import type { RouteGenericInterface } from 'fastify/types/route';

const userRepository = new UserRepositoryImpl();
const userService = new UserService(userRepository);

const userProfileRepository = new UserProfileRepositoryImpl();
const userProfileService = new UserProfileService(userProfileRepository);

const emailAuthRequestRepository = new EmailAuthRequestRepositoryImpl();
const emailAuthRequestService = new EmailAuthRequestService(emailAuthRequestRepository);

interface GetMeRoute extends RouteGenericInterface {
  Reply: {
    200: UserDTO;
    401: ErrorResponseDTO;
    404: ErrorResponseDTO;
    500: ErrorResponseDTO;
  };
}

export const getMeHandler = async (
  req: FastifyRequest<GetMeRoute>,
  rep: FastifyReply<GetMeRoute>
) => {
  try {
    const user = await userService.getUserById(req.user.id);
    if (!user) {
      return rep.status(404).send({
        code: 'USER_NOT_FOUND',
        message: 'user not found',
      });
    }
    if (user.deactivatedAt) {
      return rep.status(401).send({
        code: 'USER_DEACTIVATED',
        message: 'deactivated user',
      });
    }
    return rep.status(200).send(user);
  } catch (e) {
    console.error(e);
    return rep.status(500).send({
      code: 'UNKNOWN',
      message: 'internal server error',
    });
  }
};

interface DeactivateUserRoute extends RouteGenericInterface {
  Body: DeactivateUserBodyDTO;
  Reply: {
    200: UserDTO;
    401: ErrorResponseDTO;
    500: ErrorResponseDTO;
  };
}

export const deactivateUserHandler = async (
  req: FastifyRequest<DeactivateUserRoute>,
  rep: FastifyReply<DeactivateUserRoute>
) => {
  try {
    const user = await userService.getUserById(req.user.id);
    if (!user) {
      return rep.status(401).send({
        code: 'USER_NOT_FOUND',
        message: 'user not found',
      });
    }
    const deactivatedUser = await userService.deactivateUser(user.id);
    if (!deactivatedUser) {
      return rep.status(401).send({
        code: 'USER_NOT_FOUND',
        message: 'user not found',
      });
    }
    return rep.status(200).send(deactivatedUser);
  } catch (e) {
    console.error(e);
    return rep.status(500).send({ code: 'UNKNOWN', message: 'internal server error' });
  }
};

interface ActivateUserRoute extends RouteGenericInterface {
  Body: ActivateUserBodyDTO;
  Reply: {
    200: UserDTO;
    401: ErrorResponseDTO;
    404: ErrorResponseDTO;
    409: ErrorResponseDTO;
    500: ErrorResponseDTO;
  };
}

export const activateUserHandler = async (
  req: FastifyRequest<ActivateUserRoute>,
  rep: FastifyReply<ActivateUserRoute>
) => {
  try {
    const { authCode, email } = req.body;
    const authCodeDTO = await emailAuthRequestService.findByEmail(email);
    if (!authCodeDTO) {
      return rep.status(404).send({
        code: 'EMAIL_AUTH_REQUEST_NOT_FOUND',
        message: 'email auth request not found',
      });
    }
    if (authCodeDTO.email !== email || authCodeDTO.authcode !== authCode) {
      return rep.status(401).send({
        code: 'INVALID_EMAIL_AUTH_REQUEST',
        message: 'invalid email auth request',
      });
    }
    if (authCodeDTO.authenticated) {
      return rep.status(409).send({
        code: 'EMAIL_AUTH_REQUEST_ALREADY_AUTHENTICATED',
        message: 'already authenticated',
      });
    }
    if (authCodeDTO.createdAt) {
      const diffMinutes = Math.abs(differenceInMinutes(new Date(), authCodeDTO.createdAt));
      if (diffMinutes >= 3) {
        return rep.status(401).send({
          code: 'EMAIL_AUTH_REQUEST_TIMEOUT',
          message: 'email auth request time out',
        });
      }
    }
    await emailAuthRequestService.confirm(authCodeDTO.id);
    const userToActivate = await userService.getUserByEmail(email);
    if (!userToActivate) {
      return rep.status(404).send({
        code: 'USER_NOT_FOUND',
        message: 'cannot find user',
      });
    }
    const activatedUser = await userService.activateUser(userToActivate.id);
    if (!activatedUser) {
      return rep.status(404).send({
        code: 'USER_NOT_FOUND',
        message: 'cannot find user',
      });
    }
    return rep.status(200).send(activatedUser);
  } catch (e) {
    console.error(e);
    return rep.status(500).send({
      code: 'UNKNOWN',
      message: 'internal server error',
    });
  }
};

interface GetUserProfileByHandleRoute extends RouteGenericInterface {
  Params: GetUserProfileByHandleParamsDTO;
  Reply: {
    200: UserProfileDTO;
    404: ErrorResponseDTO;
    500: ErrorResponseDTO;
  };
}

export const getUserProfileByHandleHandler = async (
  req: FastifyRequest<GetUserProfileByHandleRoute>,
  rep: FastifyReply<GetUserProfileByHandleRoute>
) => {
  try {
    const { handle } = req.params;
    const user = await userProfileService.getUserProfileByHandle(handle.split('@').join(''));

    if (!user) {
      return rep.status(404).send({
        code: 'USER_NOT_FOUND',
        message: 'user not found by provided handle',
      });
    }

    return rep.status(200).send(user);
  } catch (e) {
    console.error(e);
    return rep.status(500).send({
      code: 'UNKNOWN',
      message: 'internal server error',
    });
  }
};
