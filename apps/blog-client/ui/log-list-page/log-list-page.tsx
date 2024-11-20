'use client'

import { LogPlatform } from '@/features'
import { useGetLogsQuery } from '@/lib'
import { PostItem, PostListContainer } from '@/ui'
import { AppLocale } from 'i18n/types'

export const LogListPage = ({ locale, platform }: { locale: AppLocale; platform: LogPlatform }) => {
  const { data: logs } = useGetLogsQuery({
    locale,
    platform,
  })
  return <PostListContainer>{logs?.map((post) => <PostItem key={post.id} {...post} />)}</PostListContainer>
}
