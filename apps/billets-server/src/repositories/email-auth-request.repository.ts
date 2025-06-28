import type { EmailAuthRequestDTO } from '../dtos/email-auth-request.dto';

export interface EmailAuthRequestRepository {
  create(email: string, authcode: string): Promise<EmailAuthRequestDTO>;
  findByEmail(email: string): Promise<EmailAuthRequestDTO | null>;
  confirm(id: string): Promise<EmailAuthRequestDTO>;
}
