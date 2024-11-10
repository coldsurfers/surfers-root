'use client'

import { Text, renderBlock } from '@/features/notion'
import { CommonBack, TagItem } from '@/ui'
import { media } from '@coldsurfers/ocean-road'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { RichTextItemResponse } from '@notionhq/client/build/src/api-endpoints'
import { Link } from 'i18n/routing'
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
            <Link
              key={tag.name}
              href={{
                pathname: '/tags/[tag]',
                params: {
                  tag: tag.name,
                },
              }}
            >
              <TagItem {...tag} />
            </Link>
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
