/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { queryLogs } from '@/lib'
import { PostItem, PostListContainer } from '@/ui'

export const LogListPage = ({ logs }: { logs: Awaited<ReturnType<typeof queryLogs>> }) => {
  return (
    <PostListContainer>
      {logs.map((post) => (
        <PostItem key={post.id} {...post} />
      ))}
    </PostListContainer>
  )
}
