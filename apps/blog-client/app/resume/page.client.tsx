'use client'

import Link from 'next/link'
import { Fragment, useEffect } from 'react'
// @ts-ignore
import html2pdf from 'html2pdf.js'
import { renderBlock } from '../../features/notion/renderer/renderer'
import postStyles from '../../styles/post.module.css'
import ArticleCareer from './components/article.career'

const generatePDF = () => {
  // Set options for html2pdf
  const options = {
    margin: 1,
    filename: 'website_screenshot.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
    pagebreak: { mode: 'avoid-all' },
  }

  // Select the element to capture
  const element = document.body

  // Generate PDF
  html2pdf()
    .from(element)
    .set({
      ...options,
    })
    .save()
}

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
