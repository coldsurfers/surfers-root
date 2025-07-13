import { z } from 'zod';

export const UserDTOSchema = z.object({
  id: z.string(),
  email: z.string(),
  provider: z.string(),
  deactivatedAt: z.date().nullable(),
});
export type UserDTO = z.infer<typeof UserDTOSchema>;

export const CreateUserDTOSchema = z.object({
  email: z.string().email(),
  provider: z.union([z.literal('email'), z.literal('google'), z.literal('apple')]),
  password: z.string().optional(),
  passwordSalt: z.string().optional(),
  handle: z.string().min(1).max(30),
});
export type CreateUserDTO = z.infer<typeof CreateUserDTOSchema>;

export const DeactivateUserBodyDTOSchema = z.object({
  type: z.literal('deactivate'),
});
export type DeactivateUserBodyDTO = z.infer<typeof DeactivateUserBodyDTOSchema>;

export const ActivateUserBodyDTOSchema = z.object({
  type: z.literal('activate'),
  authCode: z.string(),
  email: z.string().email(),
});
export type ActivateUserBodyDTO = z.infer<typeof ActivateUserBodyDTOSchema>;
