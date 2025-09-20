import { z } from 'zod';

export type StoreRegistrationContactFormType = {
  email: string;
  phone: string;
};

export const stepSchema = z.enum(['contact', 'user-voice', 'success']);
export type StoreRegistrationStep = z.infer<typeof stepSchema>;
