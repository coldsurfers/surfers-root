'use client'

import { queryKeyFactory } from '@/lib/react-query/react-query.key-factory'
import { AppLocale } from '@/lib/types/i18n'
import { PostItem, PostListContainer } from '@/ui'
import { media } from '@coldsurfers/ocean-road'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { useQuery } from '@tanstack/react-query'
import { Pagination } from './(ui)/pagination'

const Container = styled.div`
  margin-top: 6.5rem;

  ${media.medium(css`
    margin-top: 2rem;
  `)}
`

export default function Page({ locale, page }: { locale: AppLocale; page: number }) {
  const PER_LINE = 3
  const PER_PAGE = 9
  const PAGE = page
  const offset = (PAGE - 1) * PER_PAGE

  const allSeriesQuery = useQuery({
    ...queryKeyFactory.series.listAll(locale),
  })

  const latestPosts = (allSeriesQuery.data ?? [])
    .flat()
    .sort((a, b) => new Date(b.createdTime).getTime() - new Date(a.createdTime).getTime())

  const wholePage = Math.ceil(latestPosts.length / PER_PAGE)
  const currPage = page

  return (
    <Container>
      <PostListContainer>
        {latestPosts.slice(offset, offset + PER_LINE).map((post) => (
          <PostItem key={post.id} {...post} />
        ))}
      </PostListContainer>
      <PostListContainer>
        {latestPosts.slice(offset + PER_LINE, offset + PER_LINE * 2).map((post) => (
          <PostItem key={post.id} {...post} />
        ))}
      </PostListContainer>
      <PostListContainer>
        {latestPosts.slice(offset + PER_LINE * 2, offset + PER_LINE * 3).map((post) => (
          <PostItem key={post.id} {...post} />
        ))}
      </PostListContainer>
      <Pagination currPage={currPage} wholePage={wholePage} platform={null} />
    </Container>
  )
}
