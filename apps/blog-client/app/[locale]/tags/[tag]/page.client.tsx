'use client'

import { useGetLogsQuery } from '@/lib'
import { PostItem, PostListContainer } from '@/ui'
import { Spinner } from '@coldsurfers/ocean-road'
import { AppLocale } from 'i18n/types'
import { useMemo } from 'react'
import { StyledTagDetailPageTitle } from './page.styled'

export const TagsTagPageClient = ({ locale, tag }: { locale: AppLocale; tag: string }) => {
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
  const logs = useMemo(() => {
    return [...(techlogs ?? []), ...(surflogs ?? [])]
  }, [surflogs, techlogs])
  const isLoading = isLoadingTechlogs || isLoadingSurflogs
  if (isLoading) {
    return <Spinner variant="page-overlay" />
  }
  return (
    <>
      <StyledTagDetailPageTitle as="h1">#{tag}</StyledTagDetailPageTitle>
      <PostListContainer>
        {logs.map((post) => (
          <PostItem key={post.id} {...post} />
        ))}
      </PostListContainer>
    </>
  )
}
