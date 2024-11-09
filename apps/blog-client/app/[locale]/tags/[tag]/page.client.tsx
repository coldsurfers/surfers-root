/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { PostItem } from '@/features'
import { PostListContainer } from '@/ui'
import { StyledTagDetailPageTitle } from './page.styled'

export const TagDetailPageClient = ({
  tag,
  logs,
}: {
  tag: string
  logs: {
    id: string
    createdTime: Date
    lastEditedTime: Date
    dateLocale: string
    slug: any
    title: any
    status: any
    writer: any
    platform: 'techlog' | 'surflog'
  }[]
}) => {
  return (
    <>
      <StyledTagDetailPageTitle as="h1">#{tag}</StyledTagDetailPageTitle>
      <PostListContainer>
        {logs.map((post) => (
          <PostItem key={post.id} post={post} postType={post.platform} />
        ))}
      </PostListContainer>
    </>
  )
}
