'use client'

import { Fragment } from 'react'
import { renderCareerBlock } from '../../../components/notion/renderer.career'
import postStyles from '../../../styles/post.module.css'

const ArticleCareer = ({ careerBlocks }: { careerBlocks: never[] }) => (
  <article className={postStyles.container}>
    <section>
      {careerBlocks.map((block) => (
        // @ts-ignore
        <Fragment key={block.id}>{renderCareerBlock(block)}</Fragment>
      ))}
    </section>
  </article>
)

export default ArticleCareer
