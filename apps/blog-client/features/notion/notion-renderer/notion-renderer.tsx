'use client'

import 'katex/dist/katex.min.css' // For equations
import { ExtendedRecordMap } from 'notion-types'
import 'prismjs/themes/prism-tomorrow.css' // For syntax highlighting
import { NotionRenderer as NR } from 'react-notion-x'
import 'react-notion-x/src/styles.css'

export const NotionRenderer = ({ recordMap }: { recordMap: ExtendedRecordMap }) => {
  return <NR recordMap={recordMap} />
}
