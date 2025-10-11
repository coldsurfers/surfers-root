import type { PartnerContactFormDTO } from '@/dtos/partner.dto';
import type { PartnerRepository } from '@/repositories/partner.repository';

export class PartnerService {
  private partnerRepository: PartnerRepository;

  constructor(partnerRepository: PartnerRepository) {
    this.partnerRepository = partnerRepository;
  }

  async createPartnerContactForm(
    partnerContactForm: PartnerContactFormDTO
  ): Promise<PartnerContactFormDTO | null> {
    return this.partnerRepository.createPartnerContactForm(partnerContactForm);
  }
}
