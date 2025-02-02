import { z } from 'zod'

export const EventCategoryDTOSchema = z.object({
  id: z.string(),
  name: z.string(),
})
export type EventCategoryDTO = z.infer<typeof EventCategoryDTOSchema>
