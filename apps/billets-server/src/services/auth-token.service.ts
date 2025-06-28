import type { AuthTokenDTO, CreateAuthTokenDTO } from '@/dtos/auth-token.dto';
import type { AuthTokenRepository } from '@/repositories/auth-token.repository';

export class AuthTokenService {
  private authTokenRepository: AuthTokenRepository;

  constructor(authTokenRepository: AuthTokenRepository) {
    this.authTokenRepository = authTokenRepository;
  }

  async create(authToken: CreateAuthTokenDTO): Promise<AuthTokenDTO> {
    return this.authTokenRepository.create(authToken);
  }
}
