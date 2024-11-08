'use client'

import { LogDetailRenderer } from '@/features/notion'

export const TechlogSlugPageClient = (props: { pageBlocks: never[]; pageTitle: string }) => {
  return <LogDetailRenderer {...props} />
}
