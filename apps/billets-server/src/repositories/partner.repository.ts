import type { PartnerContactFormDTO } from '@/dtos/partner.dto';

export interface PartnerRepository {
  createPartnerContactForm(
    partnerContactForm: PartnerContactFormDTO
  ): Promise<PartnerContactFormDTO | null>;
}
