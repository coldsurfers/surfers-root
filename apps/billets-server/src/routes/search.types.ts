import { z } from 'zod'

export const searchListQuerystringSchema = z.object({
  keyword: z.string(),
})

export type SearchListQuerystring = z.infer<typeof searchListQuerystringSchema>
