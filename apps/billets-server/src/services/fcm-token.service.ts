import type { FCMTokenDTO } from '@/dtos/fcm-token.dto';
import type { FCMTokenRepository } from '@/repositories/fcm-token.repository';

export class FCMTokenService {
  private fcmTokenRepository: FCMTokenRepository;

  constructor(fcmTokenRepository: FCMTokenRepository) {
    this.fcmTokenRepository = fcmTokenRepository;
  }

  async create(token: string): Promise<FCMTokenDTO> {
    return this.fcmTokenRepository.create(token);
  }
  async getByToken(token: string): Promise<FCMTokenDTO | null> {
    return this.fcmTokenRepository.findByToken(token);
  }
  async linkToUser(params: { userId: string; fcmTokenId: string }): Promise<FCMTokenDTO> {
    return this.fcmTokenRepository.linkToUser(params);
  }
}
