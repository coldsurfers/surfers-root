import type { EmailAuthRequestDTO } from '@/dtos/email-auth-request.dto';
import { dbClient } from '@/lib/db/db.client';
import type { EmailAuthRequest } from '@prisma/client';
import type { EmailAuthRequestRepository } from './email-auth-request.repository';

export class EmailAuthRequestRepositoryImpl implements EmailAuthRequestRepository {
  async create(email: string, authcode: string): Promise<EmailAuthRequestDTO> {
    const data = await dbClient.emailAuthRequest.create({
      data: {
        email,
        authcode,
      },
    });
    return this.toDTO(data);
  }
  async findByEmail(email: string): Promise<EmailAuthRequestDTO | null> {
    const data = await dbClient.emailAuthRequest.findFirst({
      where: {
        email,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    if (!data) return null;
    return this.toDTO(data);
  }
  async confirm(id: string): Promise<EmailAuthRequestDTO> {
    const data = await dbClient.emailAuthRequest.update({
      where: {
        id,
      },
      data: {
        authenticated: true,
        authenticatedAt: new Date(),
      },
    });
    return this.toDTO(data);
  }

  private toDTO(model: EmailAuthRequest): EmailAuthRequestDTO {
    return {
      id: model.id,
      email: model.email,
      authcode: model.authcode,
      authenticated: model.authenticated,
      createdAt: model.createdAt.toISOString(),
    };
  }
}
