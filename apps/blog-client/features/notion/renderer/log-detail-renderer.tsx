'use client'

import { LogPlatform } from '@/features/logs'
import { NotionRenderer, Text } from '@/features/notion'
import { useGetLogDetailQuery } from '@/lib/react-query/queries/use-get-log-detail-query/use-get-log-detail-query'
import { CommonBack } from '@/ui'
import { TagList } from '@/ui/tag-list/tag-list'
import { media } from '@coldsurfers/ocean-road'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { AppLocale } from 'i18n/types'
import { useMemo } from 'react'

const Heading1 = styled.h1`
  ${media.medium(css`
    font-size: 1.25rem;
  `)}
`

export const LogDetailRenderer = ({
  slug,
  locale,
  platform,
}: {
  slug: string
  locale: AppLocale
  platform: LogPlatform
}) => {
  const { data } = useGetLogDetailQuery(slug, { platform, locale })
  const page = useMemo(() => data?.page, [data])
  const recordMap = useMemo(() => data?.recordMap, [data?.recordMap])

  const pageTitle = useMemo(() => (page?.properties.Name.type === 'title' ? page.properties.Name.title : null), [page])

  const tags = useMemo(
    () =>
      page?.properties.tags.type === 'multi_select'
        ? page?.properties.tags.multi_select.map((value) => ({
            id: value.id,
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
      <TagList tags={tags} />
      <section>
        {recordMap && <NotionRenderer recordMap={recordMap} />}
        <CommonBack />
      </section>
    </article>
  )
}
