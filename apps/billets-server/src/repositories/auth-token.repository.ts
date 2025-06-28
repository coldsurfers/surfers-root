import type { AuthTokenDTO, CreateAuthTokenDTO } from '@/dtos/auth-token.dto';

export interface AuthTokenRepository {
  create(authToken: CreateAuthTokenDTO): Promise<AuthTokenDTO>;
}
