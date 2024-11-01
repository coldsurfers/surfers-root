import { z } from "zod"

export const CredentialsEmailSchema = z.string().email('wrong email format')

// https://regexr.com/3bfsi
// min 8, max 32, at least one letter and one number
export const CredentialsPasswordSchema = z
  .string()
  .regex(
    /^(?=.*\d)(?=.*[a-z])(?=.*[a-zA-Z]).{8,32}$/,
    'Password should have at least one letter and number. Min 8, Max 32'
  )

export const CredentialsEmailVerificationCodeSchema = z
  .string()
  .max(6, 'Please write 6 digit numbers')
  .min(6, 'Please write 6 digit numbers')

export const CredentialsProviderSchema = z
  .literal('google')
  .or(z.literal('credentials'))

// https://regexr.com/3cg7r
// instagram style username schema
export const CredentialsUsernameSchema = z
  .string()
  .regex(/^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/, 'Invalid Username')

export const CredentialsSchema = z.object({
  email: CredentialsEmailSchema,
  password: CredentialsPasswordSchema,
  provider: CredentialsProviderSchema,
  accessToken: z.string().optional(),
})
