'use client'

import { queryKeyFactory } from '@/lib/react-query/react-query.key-factory'
import { AppLocale } from '@/lib/types/i18n'
import { PageLayout, PostItem, PostListContainer } from '@/ui'
import { Spinner } from '@coldsurfers/ocean-road'
import { useQuery } from '@tanstack/react-query'
import { memo, useMemo } from 'react'

type TagPostListProps = { locale: AppLocale; tag: string }

export const TagPostList = memo(({ locale, tag }: TagPostListProps) => {
  const { data: series, isLoading: isLoadingSeries } = useQuery(queryKeyFactory.series.listAll(locale, tag))

  const logs = useMemo(() => {
    return series?.flat() ?? []
  }, [series])
  const isLoading = isLoadingSeries
  if (isLoading) {
    return <Spinner variant="page-overlay" />
  }

  return (
    <PageLayout title={`#${tag}`}>
      <div style={{ marginTop: '6.5rem' }} />
      <PostListContainer>
        {logs.map((post) => (
          <PostItem key={post.id} {...post} />
        ))}
      </PostListContainer>
    </PageLayout>
  )
})
