import type { ErrorResponseDTO } from '@/dtos/error-response.dto';
import type { FCMTokenDTO, PostFCMTokenBodyDTO } from '@/dtos/fcm-token.dto';
import { FCMTokenRepositoryImpl } from '@/repositories/fcm-token.repository.impl';
import { app } from '@/server';
import { FCMTokenService } from '@/services/fcm-token.service';
import type { FastifyReply, FastifyRequest, RouteGenericInterface } from 'fastify';

const fcmTokenRepository = new FCMTokenRepositoryImpl();
const fcmTokenService = new FCMTokenService(fcmTokenRepository);

interface PostFCMRoute extends RouteGenericInterface {
  Body: PostFCMTokenBodyDTO;
  Reply: {
    201: FCMTokenDTO;
    401: ErrorResponseDTO;
    500: ErrorResponseDTO;
  };
}

export const postFCMTokenHandler = async (
  req: FastifyRequest<PostFCMRoute>,
  rep: FastifyReply<PostFCMRoute>
) => {
  try {
    const { fcmToken } = req.body;
    const { authorization: Authorization } = req.headers;
    if (Authorization) {
      const decoded = app.jwt.verify(Authorization.replace('Bearer ', ''));
      if (!decoded) {
        return rep.status(401).send({
          code: 'INVALID_ACCESS_TOKEN',
          message: 'unauthorized',
        });
      }
      const { id: userId } = decoded as {
        id: string;
      };
      let existing = await fcmTokenService.getByToken(fcmToken);
      if (!existing) {
        existing = await fcmTokenService.create(fcmToken);
      }
      const dto = await fcmTokenService.linkToUser({ userId, fcmTokenId: existing.id });
      return rep.status(201).send(dto);
    }
    // store fcm token
    const dto = await fcmTokenService.create(fcmToken);
    return rep.status(201).send(dto);
  } catch (e) {
    console.error(e);
    return rep.status(500).send({
      code: 'UNKNOWN',
      message: 'internal server error',
    });
  }
};
