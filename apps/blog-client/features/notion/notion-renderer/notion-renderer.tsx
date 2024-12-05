'use client'

import { Spinner, useColorScheme } from '@coldsurfers/ocean-road'
import 'katex/dist/katex.min.css' // For equations
import { ExtendedRecordMap } from 'notion-types'
import 'prismjs/themes/prism-tomorrow.css' // For syntax highlighting
import { useEffect, useState } from 'react'
import { NotionRenderer as NR } from 'react-notion-x'
import 'react-notion-x/src/styles.css'

export const NotionRenderer = ({ recordMap }: { recordMap: ExtendedRecordMap }) => {
  const { name } = useColorScheme()
  const isDarkMode = name === 'darkMode'
  const [isMounted, setIsMounted] = useState(false)

  //   @todo: support server-side dark mode detection
  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return <Spinner variant="page-overlay" />

  return <NR recordMap={recordMap} darkMode={isDarkMode} />
}
