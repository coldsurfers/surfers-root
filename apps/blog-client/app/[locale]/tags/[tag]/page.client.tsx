'use client'

import { useGetLogsQuery } from '@/lib'
import { PostItem, PostListContainer } from '@/ui'
import { AppLocale } from 'i18n/types'
import { useMemo } from 'react'
import { StyledTagDetailPageTitle } from './page.styled'

export const TagsTagPageClient = ({ locale, tag }: { locale: AppLocale; tag: string }) => {
  const { data: techlogs } = useGetLogsQuery({
    locale,
    platform: 'techlog',
    tag,
  })
  const { data: surflogs } = useGetLogsQuery({
    locale,
    platform: 'surflog',
    tag,
  })
  const logs = useMemo(() => {
    return [...(techlogs ?? []), ...(surflogs ?? [])]
  }, [surflogs, techlogs])
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
