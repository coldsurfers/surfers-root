'use client'

import { useGetTagsQuery } from '@/lib'
import { TagList } from '@/ui/tag-list/tag-list'
import { StyledTagPageTitle } from './page.styled'

export const TagsPageClient = () => {
  const { data } = useGetTagsQuery()
  return (
    <>
      <StyledTagPageTitle as="h1">Tags</StyledTagPageTitle>
      {data?.tags && <TagList tags={data.tags} />}
    </>
  )
}
