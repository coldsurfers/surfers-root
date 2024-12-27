'use client'

import { LogPlatform } from '@/features'
import { useGetLogsQuery } from '@/lib'
import { PostItem, PostListContainer } from '@/ui'
import { Text } from '@coldsurfers/ocean-road'
import { AppLocale } from 'i18n/types'
import { useMemo } from 'react'
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
  const title = useMemo(() => {
    return `${platform[0].toUpperCase()}${platform.slice(1, platform.length)}`
  }, [platform])
  return (
    <>
      <Text as="h2">{title}</Text>
      <PostListContainer>
        {logs?.slice(offset, offset + PER_LINE).map((post) => <PostItem key={post.id} {...post} />)}
      </PostListContainer>
      <PostListContainer>
        {logs?.slice(offset + PER_LINE, offset + PER_LINE * 2).map((post) => <PostItem key={post.id} {...post} />)}
      </PostListContainer>
      <PostListContainer>
        {logs?.slice(offset + PER_LINE * 2, offset + PER_LINE * 3).map((post) => <PostItem key={post.id} {...post} />)}
      </PostListContainer>
      <Pagination currPage={PAGE} wholePage={Math.ceil(logs?.length / PER_PAGE)} platform={platform} />
    </>
  )
}
