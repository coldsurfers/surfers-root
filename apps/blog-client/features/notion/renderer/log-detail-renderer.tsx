'use client'

import { Text, renderBlock } from '@/features/notion'
import { useGetLogDetailQuery } from '@/lib/react-query/queries/use-get-log-detail-query/use-get-log-detail-query'
import { CommonBack, TagItem } from '@/ui'
import { media } from '@coldsurfers/ocean-road'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { Link } from 'i18n/routing'
import { AppLocale } from 'i18n/types'
import { Fragment, useMemo } from 'react'

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
  slug,
  locale,
  platform,
}: {
  slug: string
  locale: AppLocale
  platform: 'techlog' | 'surflog'
}) => {
  const { data } = useGetLogDetailQuery(slug, { platform, locale })
  const page = useMemo(() => data?.page, [data])
  const blocks = useMemo(() => data?.blocks, [data])

  const pageTitle = useMemo(() => (page?.properties.Name.type === 'title' ? page.properties.Name.title : null), [page])

  const tags = useMemo(
    () =>
      page?.properties.tags.type === 'multi_select'
        ? page?.properties.tags.multi_select.map((value) => ({
            name: value.name,
            color: value.color,
          }))
        : [],
    [page],
  )

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
        {blocks?.map((block) => (
          // @ts-ignore
          <Fragment key={block.id}>{renderBlock(block)}</Fragment>
        ))}
        <CommonBack />
      </section>
    </article>
  )
}
