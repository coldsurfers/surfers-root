'use client'

import type { ExtendedRecordMap } from 'notion-types'
import { NotionRenderer } from 'react-notion-x'

export const PrivacyPolicyPageClient = ({ recordMap }: { recordMap: ExtendedRecordMap }) => {
  return <NotionRenderer recordMap={recordMap} fullPage={true} darkMode={false} />
}
