'use client'

import { generatePDF } from '@/lib'
import Link from 'next/link'
import { Fragment, useEffect } from 'react'
import { renderBlock } from '../../../features/notion/renderer/renderer'
import postStyles from '../../styles/post.module.css'
import ArticleCareer from './components/article.career'

const shouldGeneratePDF = process.env.NODE_ENV === 'development'

export default function ResumePage({
  careerBlocks,
  sideProjectCareerBlocks,
}: {
  careerBlocks: never[]
  sideProjectCareerBlocks: never[]
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
    <div>
      <ArticleCareer careerBlocks={careerBlocks} />

      <article className={postStyles.container}>
        <section>
          {sideProjectCareerBlocks.map((block) => (
            // @ts-ignore
            <Fragment key={block.id}>{renderBlock(block)}</Fragment>
          ))}
        </section>
      </article>

      {process.env.NODE_ENV === 'production' && (
        <article className={postStyles.container}>
          <Link href="/" className={postStyles.back}>
            ← Go home
          </Link>
        </article>
      )}
    </div>
  )
}
