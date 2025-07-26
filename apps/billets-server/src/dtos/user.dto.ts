import { z } from 'zod';

export const UserHandleDTOSchema = z.string().regex(/^@[a-zA-Z0-9._-]{3,30}$/, {
  message: '잘못된 핸들 형식입니다',
});
export type UserHandleDTO = z.infer<typeof UserHandleDTOSchema>;

export const UserDTOSchema = z.object({
  id: z.string(),
  email: z.string(),
  provider: z.string(),
  handle: UserHandleDTOSchema.nullable(),
  deactivatedAt: z.date().nullable(),
});
export type UserDTO = z.infer<typeof UserDTOSchema>;

export const CreateUserDTOSchema = z.object({
  email: z.string().email(),
  provider: z.union([z.literal('email'), z.literal('google'), z.literal('apple')]),
  password: z.string().optional(),
  passwordSalt: z.string().optional(),
  handle: UserHandleDTOSchema,
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
