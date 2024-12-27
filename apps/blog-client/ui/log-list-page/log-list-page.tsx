'use client'

import { LogPlatform } from '@/features'
import { useGetLogsQuery } from '@/lib'
import { PostItem, PostListContainer } from '@/ui'
import { AppLocale } from 'i18n/types'
import { Pagination } from '../../app/[locale]/(ui)/pagination'

export const LogListPage = ({ locale, platform, page }: { locale: AppLocale; platform: LogPlatform; page: number }) => {
  const PER_LINE = 3
  const PER_PAGE = 9
  const PAGE = page
  const offset = (PAGE - 1) * PER_PAGE
  const { data: logs } = useGetLogsQuery({
    locale,
    platform,
  })

  return (
    <>
      <div style={{ marginTop: '6.5rem' }} />
      <PostListContainer>
        {logs?.slice(offset, offset + PER_LINE).map((post) => <PostItem key={post.id} {...post} />)}
      </PostListContainer>
      <PostListContainer>
        {logs?.slice(offset + PER_LINE, offset + PER_LINE * 2).map((post) => <PostItem key={post.id} {...post} />)}
      </PostListContainer>
      <PostListContainer>
        {logs?.slice(offset + PER_LINE * 2, offset + PER_LINE * 3).map((post) => <PostItem key={post.id} {...post} />)}
      </PostListContainer>
      <Pagination currPage={PAGE} wholePage={Math.ceil((logs?.length ?? 0) / PER_PAGE)} platform={platform} />
    </>
  )
}
