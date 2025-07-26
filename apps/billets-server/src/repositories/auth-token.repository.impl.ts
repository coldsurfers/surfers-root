import type { AuthTokenDTO, CreateAuthTokenDTO } from '@/dtos/auth-token.dto';
import { dbClient } from '@/lib/db/db.client';
import type { AuthTokenRepository } from './auth-token.repository';

interface AuthTokenModel {
  access_token: string;
  refresh_token: string;
}

export class AuthTokenRepositoryImpl implements AuthTokenRepository {
  async create(authToken: CreateAuthTokenDTO): Promise<AuthTokenDTO> {
    const data = await dbClient.authToken.create({
      data: {
        access_token: authToken.access_token,
        refresh_token: authToken.refresh_token,
        user_id: authToken.user_id,
      },
    });
    return this.toDTO(data);
  }

  private toDTO(data: AuthTokenModel): AuthTokenDTO {
    return {
      accessToken: data.access_token,
      refreshToken: data.refresh_token,
    };
  }
}
