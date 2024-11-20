'use client'

import { LogPlatform } from '@/features'
import { useGetLogsQuery } from '@/lib'
import { PostItem, PostListContainer } from '@/ui'
import { Text } from '@coldsurfers/ocean-road'
import { AppLocale } from 'i18n/types'
import { useMemo } from 'react'

export const LogListPage = ({ locale, platform }: { locale: AppLocale; platform: LogPlatform }) => {
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
      <PostListContainer>{logs?.map((post) => <PostItem key={post.id} {...post} />)}</PostListContainer>
    </>
  )
}
