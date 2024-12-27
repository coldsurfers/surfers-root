'use client'

import { useGetTagsQuery } from '@/lib'
import { PageLayout } from '@/ui'
import { TagList } from '@/ui/tag-list/tag-list'

export const TagsPageClient = () => {
  const { data } = useGetTagsQuery()
  return (
    <PageLayout title="Tags">
      <div style={{ marginTop: '6.5rem' }} />
      {data?.tags && <TagList tags={data.tags} />}
    </PageLayout>
  )
}
