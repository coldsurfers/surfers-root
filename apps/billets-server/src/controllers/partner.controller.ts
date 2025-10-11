import type { ErrorResponseDTO } from '@/dtos/error-response.dto';
import type { PartnerContactFormDTO, SendPartnerContactFormResponseDTO } from '@/dtos/partner.dto';
import { PartnerRepositoryImpl } from '@/repositories/partner.repository.impl';
import { PartnerService } from '@/services/partner.service';
import type { FastifyReply } from 'fastify/types/reply';
import type { FastifyRequest } from 'fastify/types/request';
import type { RouteGenericInterface } from 'fastify/types/route';

const partnerRepository = new PartnerRepositoryImpl();
const partnerService = new PartnerService(partnerRepository);

interface SendPartnerContactFormRoute extends RouteGenericInterface {
  Body: PartnerContactFormDTO;
  Reply: {
    200: SendPartnerContactFormResponseDTO;
    500: ErrorResponseDTO;
  };
}

export const sendPartnerContactFormHandler = async (
  req: FastifyRequest<SendPartnerContactFormRoute>,
  rep: FastifyReply<SendPartnerContactFormRoute>
) => {
  const {
    name,
    email,
    company,
    phone,
    websiteLink,
    message,
    instagramLink,
    twitterLink,
    facebookLink,
    role,
  } = req.body;

  try {
    const partnerContactForm = await partnerService.createPartnerContactForm({
      name,
      email,
      company,
      phone,
      websiteLink,
      message,
      instagramLink,
      twitterLink,
      facebookLink,
      role,
    });

    if (!partnerContactForm) {
      throw new Error('Failed to create partner contact form');
    }
    return rep.status(200).send({
      success: true,
    });
  } catch (e) {
    console.error(e);
    return rep.status(500).send({
      code: 'UNKNOWN',
      message: 'internal server error',
    });
  }
};
