'use client'

import { LogPlatform } from '@/features/logs'
import { NotionRenderer } from '@/features/notion'
import { useGetLogDetailQuery } from '@/lib/react-query/queries/use-get-log-detail-query/use-get-log-detail-query'
import { CommonBack, PageLayout } from '@/ui'
import { TagList } from '@/ui/tag-list/tag-list'
import { media, Text } from '@coldsurfers/ocean-road'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { AppLocale } from 'i18n/types'
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
  // @ts-ignore
  const writerName = useMemo(() => page?.properties?.Writer?.people?.at(0)?.name, [page?.properties?.Writer?.people])

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
