import { z } from 'zod';
import { AuthTokenDTOSchema } from './auth-token.dto';
import { UserDTOSchema } from './user.dto';

export const PlatformDTOSchema = z.union([
  z.literal('android'),
  z.literal('ios'),
  z.literal('web'),
]);
export type PlatformDTO = z.infer<typeof PlatformDTOSchema>;

const ProviderDTOSchema = z.union([z.literal('google'), z.literal('apple'), z.literal('email')]);

export const SignInBodyDTOSchema = z.object({
  provider: ProviderDTOSchema,
  email: z.string(),
  password: z.string().optional(),
  token: z.string().optional(),
  platform: PlatformDTOSchema.optional(),
});
export type SignInBodyDTO = z.infer<typeof SignInBodyDTOSchema>;

export const UserWithAuthTokenDTOSchema = z.object({
  user: UserDTOSchema,
  authToken: AuthTokenDTOSchema,
});
export type UserWithAuthTokenDTO = z.infer<typeof UserWithAuthTokenDTOSchema>;

export const SignUpBodyDTOSchema = z.object({
  provider: ProviderDTOSchema,
  email: z.string(),
  password: z.string().optional(),
  token: z.string().optional(),
  platform: PlatformDTOSchema.optional(),
});
export type SignUpBodyDTO = z.infer<typeof SignUpBodyDTOSchema>;

export const ReissueTokenBodyDTOSchema = z.object({
  refreshToken: z.string(),
});
export type ReissueTokenBodyDTO = z.infer<typeof ReissueTokenBodyDTOSchema>;
