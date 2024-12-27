'use client'

import { LogPlatform } from '@/features/logs'
import { NotionRenderer } from '@/features/notion'
import { useGetLogDetailQuery } from '@/lib/react-query/queries/use-get-log-detail-query/use-get-log-detail-query'
import { CommonBack, PageLayout } from '@/ui'
import { TagList } from '@/ui/tag-list/tag-list'
import { AppLocale } from 'i18n/types'
import { useMemo } from 'react'

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
    <PageLayout title={pageTitle.at(0)?.plain_text}>
      <article style={{ marginTop: '2rem' }}>
        <TagList tags={tags} />
        <section>
          {recordMap && <NotionRenderer recordMap={recordMap} />}
          <CommonBack />
        </section>
      </article>
    </PageLayout>
  )
}
