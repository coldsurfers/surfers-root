'use client'

import { LogDetailRenderer } from '@/features/notion'
import { RichTextItemResponse } from '@notionhq/client/build/src/api-endpoints'

export const SurflogSlugPageClient = (props: {
  pageBlocks: never[]
  pageTitle: RichTextItemResponse[] | null
  tags: { name: string; color: string }[]
}) => {
  return <LogDetailRenderer {...props} />
}
