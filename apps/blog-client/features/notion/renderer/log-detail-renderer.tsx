'use client'

import { NotionRenderer } from '@/features/notion'
import { queryKeyFactory } from '@/lib/react-query/react-query.key-factory'
import { AppLocale } from '@/lib/types/i18n'
import { SeriesCategory } from '@/lib/types/series'
import { CommonBack, PageLayout } from '@/ui'
import { TagList } from '@/ui/tag-list/tag-list'
import { media, Text } from '@coldsurfers/ocean-road'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { PersonUserObjectResponse } from '@notionhq/client/build/src/api-endpoints'
import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'

const WriterText = styled(Text)`
  font-size: 20px;

  ${media.small(css`
    font-size: 16px;
  `)}
`

const RendererSection = styled.section`
  margin-top: 2rem;

  ${media.small(css`
    margin-top: 1rem;
  `)}
`

export const LogDetailRenderer = ({
  slug,
  locale,
  seriesCategory,
}: {
  slug: string
  locale: AppLocale
  seriesCategory: SeriesCategory
}) => {
  const { data } = useQuery(
    queryKeyFactory.series.item(slug, {
      appLocale: locale,
      seriesCategory,
    }),
  )
  const page = useMemo(() => data?.page, [data])
  const recordMap = useMemo(() => data?.recordMap, [data?.recordMap])

  const pageTitle = useMemo(() => (page?.properties.Name.type === 'title' ? page.properties.Name.title : null), [page])
  const writerName = useMemo(() => {
    if (page?.properties.Writer?.type === 'people') {
      const writer = page.properties.Writer.people.at(0) as PersonUserObjectResponse
      return writer.name
    }
    return ''
  }, [page])

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
    <PageLayout title={pageTitle?.at(0)?.plain_text}>
      <article style={{ marginTop: '2rem' }}>
        <TagList tags={tags} />
        <div
          style={{
            textAlign: 'center',
            marginBottom: '1rem',
            marginTop: '1rem',
          }}
        >
          <WriterText>Written by {writerName}</WriterText>
        </div>
        <RendererSection>
          {recordMap && <NotionRenderer recordMap={recordMap} />}
          <CommonBack />
        </RendererSection>
      </article>
    </PageLayout>
  )
}
