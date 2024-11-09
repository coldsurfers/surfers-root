'use client'

import { Text, renderBlock } from '@/features/notion'
import { CommonBack } from '@/ui'
import variables from '@coldsurfers/design-tokens/dist/js/color/semantic/variables'
import { media } from '@coldsurfers/ocean-road'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { RichTextItemResponse } from '@notionhq/client/build/src/api-endpoints'
import { Fragment } from 'react'

const Heading1 = styled.h1`
  ${media.medium(css`
    font-size: 1.25rem;
  `)}
`

const StyledSectionTagList = styled.section`
  display: flex;
  flex-wrap: wrap;
`

const StyledTagItem = styled.div`
  background-color: ${variables.color.background[4]};
  opacity: 0.8;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  cursor: pointer;

  margin-right: 0.5rem;
  margin-bottom: 0.5rem;

  color: ${variables.color.foreground[3]};
`

export const LogDetailRenderer = ({
  pageTitle,
  pageBlocks,
  tags,
}: {
  pageBlocks: never[]
  pageTitle: RichTextItemResponse[] | null
  tags: { name: string; color: string }[]
}) => {
  return (
    <article>
      <Heading1>
        <Text title={pageTitle} />
      </Heading1>
      <StyledSectionTagList>
        {tags.map((tag) => {
          return (
            <StyledTagItem key={tag.name} color={tag.color}>
              #{tag.name}
            </StyledTagItem>
          )
        })}
      </StyledSectionTagList>
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
