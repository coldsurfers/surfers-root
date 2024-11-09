/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { PostItem } from '@/features'
import { PostListContainer } from '@/ui'

export const TagDetailPageClient = ({
  logs,
}: {
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
    <PostListContainer>
      {logs.map((post) => (
        <PostItem key={post.id} post={post} postType={post.platform} />
      ))}
    </PostListContainer>
  )
}
