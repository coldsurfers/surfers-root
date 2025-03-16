import { z } from 'zod'

const validateCreateUserSchema = z
  .object({
    email: z.string().email(),
    password: z
      .string()
      .min(8)
      .max(30)
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,30}$/),
    passwordConfirm: z
      .string()
      .min(8)
      .max(30)
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,30}$/),
  })
  .superRefine(({ password, passwordConfirm }, ctx) => {
    if (password !== passwordConfirm)
      ctx.addIssue({
        code: 'custom',
        path: ['passwordConfirm'],
        message: 'password confirm is not same',
      })
  })

export type ValidateCreateUserSchema = z.infer<typeof validateCreateUserSchema>

export function validateCreateUser({ email, password, passwordConfirm }: ValidateCreateUserSchema) {
  return validateCreateUserSchema.safeParse({
    email,
    password,
    passwordConfirm,
  })
}
