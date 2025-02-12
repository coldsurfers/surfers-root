'use client'

import { NotionRenderer } from '@/features/notion'
import { generatePDF } from '@/features/pdf'
import { AppLocale } from '@/lib/types/i18n'
import { PageLayout } from '@/ui'
import variables from '@coldsurfers/design-tokens/dist/js/color/variables'
import styled from '@emotion/styled'
import Link from 'next/link'
import { ExtendedRecordMap } from 'notion-types'
import { useEffect } from 'react'
import postStyles from '../../../../../../styles/post.module.css'

const Wrapper = styled.div`
  a {
    color: ${variables.oc.blue[5].value};
  }
`

const shouldGeneratePDF = process.env.NODE_ENV === 'development'

export function PageRenderer({
  careerRecordMap,
  title,
}: {
  locale: AppLocale
  careerRecordMap: ExtendedRecordMap
  title: string
}) {
  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout> | null = null
    if (shouldGeneratePDF) {
      timeoutId = setTimeout(() => {
        generatePDF()
      }, 1500)
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
    }
  }, [])

  return (
    <PageLayout title={title}>
      <Wrapper>
        {/* career */}
        <NotionRenderer recordMap={careerRecordMap} />

        {process.env.NODE_ENV === 'production' && (
          <article className={postStyles.container}>
            <Link href="/" className={postStyles.back}>
              ← Go home
            </Link>
          </article>
        )}
      </Wrapper>
    </PageLayout>
  )
}
