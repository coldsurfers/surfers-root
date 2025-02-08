'use client'

import { queryKeyFactory } from '@/lib/react-query/react-query.key-factory'
import { AppLocale } from '@/lib/types/i18n'
import { PostItem, PostListContainer } from '@/ui'
import { media } from '@coldsurfers/ocean-road'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { useQuery } from '@tanstack/react-query'
import { memo, useMemo } from 'react'
import { PAGINATION_PER_LINE, PAGINATION_PER_PAGE } from '../../../../lib/pagination.constants'

const Container = styled.div`
  margin-top: 6.5rem;

  ${media.medium(css`
    margin-top: 2rem;
  `)}
`

type PostPaginationListProps = {
  locale: AppLocale
  page: number
}

export const PostPaginationList = memo(({ locale, page }: PostPaginationListProps) => {
  const offset = useMemo(() => (page - 1) * PAGINATION_PER_PAGE, [page])

  const allSeriesQuery = useQuery({
    ...queryKeyFactory.series.listAll(locale),
  })

  const latestPosts = useMemo(
    () =>
      (allSeriesQuery.data ?? [])
        .flat()
        .sort((a, b) => new Date(b.createdTime).getTime() - new Date(a.createdTime).getTime()),
    [allSeriesQuery.data],
  )

  return (
    <Container>
      <PostListContainer>
        {latestPosts.slice(offset, offset + PAGINATION_PER_LINE).map((post) => (
          <PostItem key={post.id} {...post} />
        ))}
      </PostListContainer>
      <PostListContainer>
        {latestPosts.slice(offset + PAGINATION_PER_LINE, offset + PAGINATION_PER_LINE * 2).map((post) => (
          <PostItem key={post.id} {...post} />
        ))}
      </PostListContainer>
      <PostListContainer>
        {latestPosts.slice(offset + PAGINATION_PER_LINE * 2, offset + PAGINATION_PER_LINE * 3).map((post) => (
          <PostItem key={post.id} {...post} />
        ))}
      </PostListContainer>
    </Container>
  )
})
