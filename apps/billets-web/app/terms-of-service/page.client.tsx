'use client'

import { type ExtendedRecordMap } from 'notion-types'
import { NotionRenderer } from 'react-notion-x'

export const TermsOfServicePageClient = ({ recordMap }: { recordMap: ExtendedRecordMap }) => {
  return <NotionRenderer recordMap={recordMap} />
}
