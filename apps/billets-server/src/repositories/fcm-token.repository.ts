import type { FCMTokenDTO } from '@/dtos/fcm-token.dto';

export interface FCMTokenRepository {
  create(token: string): Promise<FCMTokenDTO>;
  linkToUser(params: { userId: string; fcmTokenId: string }): Promise<FCMTokenDTO>;
  findByToken(token: string): Promise<FCMTokenDTO | null>;
}
