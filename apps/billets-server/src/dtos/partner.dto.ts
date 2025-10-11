import { z } from 'zod';

export const PartnerContactFormRoleDTOSchema = z.union([
  z.literal('venue-owner'),
  z.literal('event-promoter'),
  z.literal('artist'),
  z.literal('other'),
]);
export type PartnerContactFormRoleDTO = z.infer<typeof PartnerContactFormRoleDTOSchema>;

export const PartnerContactFormDTOSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  email: z.string(),
  company: z.string().optional(),
  phone: z.string().optional(),
  websiteLink: z.string().optional(),
  message: z.string(),
  instagramLink: z.string().optional(),
  twitterLink: z.string().optional(),
  facebookLink: z.string().optional(),
  role: PartnerContactFormRoleDTOSchema,
});
export type PartnerContactFormDTO = z.infer<typeof PartnerContactFormDTOSchema>;

export const SendPartnerContactFormResponseDTOSchema = z.object({
  success: z.boolean(),
});
export type SendPartnerContactFormResponseDTO = z.infer<
  typeof SendPartnerContactFormResponseDTOSchema
>;
