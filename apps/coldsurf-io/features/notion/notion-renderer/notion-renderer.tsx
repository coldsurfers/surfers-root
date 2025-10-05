'use client'

import type { ExtendedRecordMap } from 'notion-types'
import { NotionRenderer as NotionRendererX } from 'react-notion-x'

export function NotionRenderer({ recordMap }: { recordMap: ExtendedRecordMap }) {
  return <NotionRendererX recordMap={recordMap} />
}
