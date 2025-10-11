import type { PartnerContactFormDTO, PartnerContactFormRoleDTO } from '@/dtos/partner.dto';
import { dbClient } from '@/lib/db';
import type { PartnerContactForm } from '@prisma/client';
import type { PartnerRepository } from './partner.repository';

export class PartnerRepositoryImpl implements PartnerRepository {
  async createPartnerContactForm(
    partnerContactForm: PartnerContactFormDTO
  ): Promise<PartnerContactFormDTO | null> {
    try {
      const data = await dbClient.partnerContactForm.create({
        data: partnerContactForm,
      });
      return this.toDTO(data);
    } catch (e) {
      console.error(e);
      return null;
    }
  }

  private toDTO(model: PartnerContactForm): PartnerContactFormDTO {
    return {
      id: model.id,
      name: model.name,
      email: model.email,
      company: model.company ?? undefined,
      phone: model.phone ?? undefined,
      websiteLink: model.websiteLink ?? undefined,
      message: model.message,
      instagramLink: model.instagramLink ?? undefined,
      twitterLink: model.twitterLink ?? undefined,
      facebookLink: model.facebookLink ?? undefined,
      role: model.role as PartnerContactFormRoleDTO,
    };
  }
}
