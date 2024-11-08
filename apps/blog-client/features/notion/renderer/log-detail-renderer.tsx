'use client'

import { Text, renderBlock } from '@/features/notion'
import { CommonBack } from '@/ui'
import { media } from '@coldsurfers/ocean-road'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
// prismjs
// import 'prismjs/components/prism-jsx'
import 'prismjs/themes/prism-tomorrow.css'
import { Fragment } from 'react'

const Heading1 = styled.h1`
  ${media.medium(css`
    font-size: 1.25rem;
  `)}
`

export const LogDetailRenderer = ({ pageTitle, pageBlocks }: { pageBlocks: never[]; pageTitle: string }) => {
  return (
    <article>
      <Heading1>
        {/* @ts-ignore */}
        <Text title={pageTitle} />
      </Heading1>
      <section>
        {pageBlocks.map((block) => (
          // @ts-ignore
          <Fragment key={block.id}>{renderBlock(block)}</Fragment>
        ))}
        <CommonBack />
      </section>
    </article>
  )
}
