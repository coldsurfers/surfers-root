import { z } from 'zod'

export const GetSubscribeCommonParamsDTOSchema = z.object({
  id: z.string(),
})
export type GetSubscribeCommonParamsDTO = z.infer<typeof GetSubscribeCommonParamsDTOSchema>
