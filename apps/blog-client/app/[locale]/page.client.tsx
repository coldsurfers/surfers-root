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

  // return useQuery({
  //   ...options,
  //   ...queryKeyFactory.logs.list({
  //     platform,
  //     locale,
  //     tag,
  //   }),
  // })

  const { data: YMLT } = useQuery({
    ...queryKeyFactory.series.list({
      appLocale: locale,
      series: 'YMLT',
    }),
  })
  const { data: YMRT } = useQuery({
    ...queryKeyFactory.series.list({
      appLocale: locale,
      series: 'YMRT',
    }),
  })
  const { data: YMWT } = useQuery({
    ...queryKeyFactory.series.list({
      appLocale: locale,
      series: 'YMWT',
    }),
  })
  const { data: YMCT } = useQuery({
    ...queryKeyFactory.series.list({
      appLocale: locale,
      series: 'YMCT',
    }),
  })
  // const { data: filmlogs } = useGetLogsQuery({
  //   platform: 'filmlog',
  //   locale,
  // })
  // const { data: soundlogs } = useGetLogsQuery({
  //   platform: 'soundlog',
  //   locale,
  // })
  // const { data: squarelogs } = useGetLogsQuery({
  //   platform: 'squarelog',
  //   locale,
  // })
  // const { data: textlogs } = useGetLogsQuery({
  //   platform: 'textlog',
  //   locale,
  // })

  const latestPosts = [
    ...(YMLT ?? []),
    ...(YMRT ?? []),
    ...(YMWT ?? []),
    ...(YMCT ?? []),
    // ...(squarelogs ?? []),
    // ...(filmlogs ?? []),
    // ...(techlogs ?? []),
    // ...(soundlogs ?? []),
    // ...(textlogs ?? []),
  ].sort((a, b) => new Date(b.createdTime).getTime() - new Date(a.createdTime).getTime())

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
