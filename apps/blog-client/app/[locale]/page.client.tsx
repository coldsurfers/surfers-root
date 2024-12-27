'use client'

import { useGetLogsQuery } from '@/lib/react-query'
import { PostItem, PostListContainer } from '@/ui'
import { AppLocale } from 'i18n/types'
import { Pagination } from './(ui)/pagination'

export default function Page({ locale, page }: { locale: AppLocale; page: number }) {
  const PER_LINE = 3
  const PER_PAGE = 9
  const PAGE = page
  const offset = (PAGE - 1) * PER_PAGE

  const { data: techlogs } = useGetLogsQuery({
    platform: 'techlog',
    locale,
  })
  const { data: surflogs } = useGetLogsQuery({
    platform: 'surflog',
    locale,
  })
  const { data: filmlogs } = useGetLogsQuery({
    platform: 'filmlog',
    locale,
  })
  const { data: soundlogs } = useGetLogsQuery({
    platform: 'soundlog',
    locale,
  })
  const { data: squarelogs } = useGetLogsQuery({
    platform: 'squarelog',
    locale,
  })
  const { data: textlogs } = useGetLogsQuery({
    platform: 'textlog',
    locale,
  })

  const latestPosts = [
    ...(squarelogs ?? []),
    ...(filmlogs ?? []),
    ...(techlogs ?? []),
    ...(surflogs ?? []),
    ...(soundlogs ?? []),
    ...(textlogs ?? []),
  ].sort((a, b) => new Date(b.createdTime).getTime() - new Date(a.createdTime).getTime())

  const wholePage = Math.ceil(latestPosts.length / PER_PAGE)
  const currPage = page

  return (
    <div style={{ marginTop: '6.5rem' }}>
      <PostListContainer>
        {latestPosts.slice(offset, offset + PER_LINE).map((post) => (
          <PostItem key={post.id} {...post} />
        ))}
      </PostListContainer>
      <PostListContainer>
        {latestPosts.slice(offset + PER_LINE, offset + PER_LINE * 2).map((post) => (
          <PostItem key={post.id} {...post} />
        ))}
      </PostListContainer>
      <PostListContainer>
        {latestPosts.slice(offset + PER_LINE * 2, offset + PER_LINE * 3).map((post) => (
          <PostItem key={post.id} {...post} />
        ))}
      </PostListContainer>
      <Pagination currPage={currPage} wholePage={wholePage} />
    </div>
  )
}
