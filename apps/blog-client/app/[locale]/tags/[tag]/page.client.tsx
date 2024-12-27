'use client'

import { useGetLogsQuery } from '@/lib'
import { PageLayout, PostItem, PostListContainer } from '@/ui'
import { Spinner } from '@coldsurfers/ocean-road'
import { AppLocale } from 'i18n/types'
import { useMemo } from 'react'

export const TagsTagPageClient = ({ locale, tag }: { locale: AppLocale; tag: string }) => {
  /**
   * @todo refactor redundant queries
   */
  const { data: techlogs, isLoading: isLoadingTechlogs } = useGetLogsQuery({
    locale,
    platform: 'techlog',
    tag,
  })
  const { data: surflogs, isLoading: isLoadingSurflogs } = useGetLogsQuery({
    locale,
    platform: 'surflog',
    tag,
  })
  const { data: filmlogs, isLoading: isLoadingFilmlogs } = useGetLogsQuery({
    locale,
    platform: 'filmlog',
    tag,
  })
  const { data: soundlogs, isLoading: isLoadingSoundlogs } = useGetLogsQuery({
    locale,
    platform: 'soundlog',
    tag,
  })
  const { data: squarelogs, isLoading: isLoadingSquarelogs } = useGetLogsQuery({
    locale,
    platform: 'squarelog',
    tag,
  })
  const { data: textlogs, isLoading: isLoadingTextlogs } = useGetLogsQuery({
    locale,
    platform: 'textlog',
    tag,
  })
  const logs = useMemo(() => {
    return [
      ...(techlogs ?? []),
      ...(surflogs ?? []),
      ...(filmlogs ?? []),
      ...(soundlogs ?? []),
      ...(squarelogs ?? []),
      ...(textlogs ?? []),
    ]
  }, [filmlogs, soundlogs, squarelogs, surflogs, techlogs, textlogs])
  const isLoading =
    isLoadingTechlogs ||
    isLoadingSurflogs ||
    isLoadingFilmlogs ||
    isLoadingSoundlogs ||
    isLoadingSquarelogs ||
    isLoadingTextlogs
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
}
