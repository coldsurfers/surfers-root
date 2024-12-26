import { z } from 'zod'

export const HighlightedLinkPropsSchema = z.discriminatedUnion('type', [
  z.object({
    type: z.literal('youtube'),
    youtubeId: z.string(),
    title: z.string(),
  }),
])
export type HighlightedLinkProps = z.infer<typeof HighlightedLinkPropsSchema>
