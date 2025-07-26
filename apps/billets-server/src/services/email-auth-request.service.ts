import type { EmailAuthRequestDTO } from '@/dtos/email-auth-request.dto';
import type { EmailAuthRequestRepository } from '@/repositories/email-auth-request.repository';

export class EmailAuthRequestService {
  private emailAuthRequestRepository: EmailAuthRequestRepository;
  constructor(emailAuthRequestRepository: EmailAuthRequestRepository) {
    this.emailAuthRequestRepository = emailAuthRequestRepository;
  }

  create(email: string, authcode: string): Promise<EmailAuthRequestDTO> {
    return this.emailAuthRequestRepository.create(email, authcode);
  }

  confirm(id: string): Promise<EmailAuthRequestDTO> {
    return this.emailAuthRequestRepository.confirm(id);
  }

  findByEmail(email: string): Promise<EmailAuthRequestDTO | null> {
    return this.emailAuthRequestRepository.findByEmail(email);
  }
}
