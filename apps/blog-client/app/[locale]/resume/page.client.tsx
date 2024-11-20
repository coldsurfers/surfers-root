'use client'

import { renderBlock } from '@/features/notion'
import { generatePDF } from '@/features/pdf'
import { useGetResumeQuery } from '@/lib'
import variables from '@coldsurfers/design-tokens/dist/js/color/variables'
import styled from '@emotion/styled'
import { AppLocale } from 'i18n/types'
import Link from 'next/link'
import { Fragment, useEffect } from 'react'
import postStyles from '../../../styles/post.module.css'
import ArticleCareer from './components/article.career'

const Wrapper = styled.div`
  a {
    color: ${variables.oc.blue[5].value};
  }
`

const shouldGeneratePDF = process.env.NODE_ENV === 'development'

export default function ResumePage({ locale }: { locale: AppLocale }) {
  const { data } = useGetResumeQuery({ locale })
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
    <Wrapper>
      {data?.blocks.career && <ArticleCareer careerBlocks={data.blocks.career} />}

      {data?.blocks.side && (
        <article className={postStyles.container}>
          <section>
            {data.blocks.side.map((block) => (
              // @ts-ignore
              <Fragment key={block.id}>{renderBlock(block)}</Fragment>
            ))}
          </section>
        </article>
      )}

      {process.env.NODE_ENV === 'production' && (
        <article className={postStyles.container}>
          <Link href="/" className={postStyles.back}>
            ← Go home
          </Link>
        </article>
      )}
    </Wrapper>
  )
}
