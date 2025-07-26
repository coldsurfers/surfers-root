import type { FCMTokenDTO } from '@/dtos/fcm-token.dto';
import { dbClient } from '@/lib/db/db.client';
import type { FCMTokenRepository } from './fcm-token.repository';

interface FCMTokenModel {
  id: string;
  tokenValue: string;
}

export class FCMTokenRepositoryImpl implements FCMTokenRepository {
  async linkToUser(params: { userId: string; fcmTokenId: string }): Promise<FCMTokenDTO> {
    const data = await dbClient.usersOnFCMTokens.upsert({
      where: {
        userId_fcmTokenId: {
          userId: params.userId,
          fcmTokenId: params.fcmTokenId,
        },
      },
      update: {
        updatedAt: new Date(),
      },
      create: {
        userId: params.userId,
        fcmTokenId: params.fcmTokenId,
      },
      include: {
        fcmToken: true,
      },
    });
    return this.toDTO({
      id: data.fcmTokenId,
      tokenValue: data.fcmToken.tokenValue,
    });
  }
  async create(token: string): Promise<FCMTokenDTO> {
    const data = await dbClient.fCMToken.create({
      data: {
        tokenValue: token,
      },
    });
    return this.toDTO(data);
  }
  async findByToken(token: string): Promise<FCMTokenDTO | null> {
    const data = await dbClient.fCMToken.findUnique({
      where: {
        tokenValue: token,
      },
    });
    if (!data) {
      return null;
    }
    return data ? this.toDTO(data) : null;
  }

  private toDTO(data: FCMTokenModel): FCMTokenDTO {
    return {
      id: data.id,
      token: data.tokenValue,
    };
  }
}
