'use client'

import { LogDetailRenderer } from '@/features/notion'

export const SurflogSlugPageClient = (props: { pageBlocks: never[]; pageTitle: string }) => {
  return <LogDetailRenderer {...props} />
}
