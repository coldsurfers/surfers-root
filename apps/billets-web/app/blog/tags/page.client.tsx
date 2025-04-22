'use client'

import { useQuery } from '@tanstack/react-query'
import { PageLayout } from '../(components)/page-layout'
import { TagList } from '../(components)/tag-list/tag-list'
import { queryKeyFactory } from '../(react-query)/react-query.key-factory'

export const TagsPageClient = () => {
  const { data } = useQuery({
    ...queryKeyFactory.tags.list,
  })
  return (
    <PageLayout title="Tags">
      <div style={{ marginTop: '6.5rem' }} />
      {data?.tags && <TagList tags={data.tags} />}
    </PageLayout>
  )
}
