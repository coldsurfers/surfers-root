'use client'

import { LogDetailRenderer } from '@/features/notion'
// prismjs
import 'prismjs/components/prism-jsx'
import 'prismjs/themes/prism-tomorrow.css'

export const TechlogSlugPageClient = (props: { pageBlocks: never[]; pageTitle: string }) => {
  return <LogDetailRenderer {...props} />
}
