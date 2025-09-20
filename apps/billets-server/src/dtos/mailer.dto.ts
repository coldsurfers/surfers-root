import { z } from 'zod';

export const SendUserVoiceBodyDTOSchema = z.object({
  email: z.string(),
  message: z.string(),
  phone: z.string(),
  // deprecated
  name: z.string().optional(),
  // deprecated
  updateAgreement: z.boolean().optional(),
});
export type SendUserVoiceBodyDTO = z.infer<typeof SendUserVoiceBodyDTOSchema>;

export const SendEmailResponseDTOSchema = z.object({
  success: z.boolean(),
});
export type SendEmailResponseDTO = z.infer<typeof SendEmailResponseDTOSchema>;
