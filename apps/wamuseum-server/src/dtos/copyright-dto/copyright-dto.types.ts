import { z } from 'zod'

export const copyrightDTOSerializedSchema = z.object({
  id: z.string(),
  owner: z.string(),
  license: z.string(),
})
export type CopyrightDTOSerialized = z.infer<typeof copyrightDTOSerializedSchema>
