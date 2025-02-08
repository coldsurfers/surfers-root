'use client'

import { queryKeyFactory } from '@/lib/react-query/react-query.key-factory'
import { generateSeriesHref } from '@/lib/utils'
import { Text } from '@coldsurfers/ocean-road'
import { useQuery } from '@tanstack/react-query'
import { Link } from 'i18n/routing'
import { useMemo } from 'react'
import { PAGINATION_PER_PAGE } from '../../../../lib/pagination.constants'
import { MoveLeftIcon, MoveRightIcon, PageMoveButton, StyledPaginationContainer } from './pagination.styled'
import { PaginationProps } from './pagination.types'

export function Pagination({ appLocale, currentPage, series }: PaginationProps) {
  const allSeriesQuery = useQuery({
    ...queryKeyFactory.series.listAll(appLocale),
  })

  const latestPosts = useMemo(
    () =>
      (allSeriesQuery.data ?? [])
        .flat()
        .sort((a, b) => new Date(b.createdTime).getTime() - new Date(a.createdTime).getTime()),
    [allSeriesQuery.data],
  )

  const wholePage = useMemo(() => Math.ceil(latestPosts.length / PAGINATION_PER_PAGE), [latestPosts.length])

  const seriesHrefPrev = useMemo(
    () =>
      generateSeriesHref({
        series: series ?? undefined,
        query: {
          page: currentPage - 1 > 0 ? currentPage - 1 : 1,
        },
      }),
    [currentPage, series],
  )

  const seriesHrefNext = useMemo(
    () =>
      generateSeriesHref({
        series: series ?? undefined,
        query: {
          page: currentPage + 1 > wholePage ? wholePage : currentPage + 1,
        },
      }),
    [currentPage, series, wholePage],
  )

  return (
    <StyledPaginationContainer>
      <Text as="p">
        {currentPage}/{wholePage}
      </Text>
      <Link href={seriesHrefPrev}>
        <PageMoveButton>
          <MoveLeftIcon />
        </PageMoveButton>
      </Link>
      <Link href={seriesHrefNext}>
        <PageMoveButton>
          <MoveRightIcon />
        </PageMoveButton>
      </Link>
    </StyledPaginationContainer>
  )
}
