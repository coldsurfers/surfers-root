'use client'

import { PAGINATION_PER_LINE, PAGINATION_PER_PAGE } from '@/lib/pagination.constants'
import { queryKeyFactory } from '@/lib/react-query/react-query.key-factory'
import { SeriesItem } from '@/lib/types/series'
import { PostItem, PostListContainer } from '@/ui'
import { useQuery } from '@tanstack/react-query'
import { memo, useMemo } from 'react'
import { Pagination } from '../pagination'
import { StyledPostListContainer } from './post-list.styled'

type PostListProps = { postItems: SeriesItem[]; page: number }

export const PostList = memo(({ postItems, page }: PostListProps) => {
  const offset = useMemo(() => (page - 1) * PAGINATION_PER_PAGE, [page])
  const { data: seriesItems } = useQuery({
    ...queryKeyFactory.series.list({
      series,
      appLocale: locale,
    }),
  })

  const items = useMemo(() => seriesItems?.flat() ?? [], [seriesItems])

  return (
    <StyledPostListContainer>
      <PostListContainer>
        {items.slice(offset, offset + PAGINATION_PER_LINE).map((post) => (
          <PostItem key={post.id} {...post} />
        ))}
      </PostListContainer>
      <PostListContainer>
        {items.slice(offset + PAGINATION_PER_LINE, offset + PAGINATION_PER_LINE * 2).map((post) => (
          <PostItem key={post.id} {...post} />
        ))}
      </PostListContainer>
      <PostListContainer>
        {items.slice(offset + PAGINATION_PER_LINE * 2, offset + PAGINATION_PER_LINE * 3).map((post) => (
          <PostItem key={post.id} {...post} />
        ))}
      </PostListContainer>
      <Pagination currentPage={page} series={series} appLocale={locale} />
    </StyledPostListContainer>
  )
})
