'use client'

import { generateSeriesHref } from '@/lib/utils'
import { Text } from '@coldsurfers/ocean-road'
import { Link } from 'i18n/routing'
import { useMemo } from 'react'
import { MoveLeftIcon, MoveRightIcon, PageMoveButton, StyledPaginationContainer } from './pagination.styled'
import { PaginationProps } from './pagination.types'

export function Pagination({ currentPage, series, totalPage }: PaginationProps) {
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
          page: currentPage + 1 > totalPage ? totalPage : currentPage + 1,
        },
      }),
    [currentPage, series, totalPage],
  )

  return (
    <StyledPaginationContainer>
      <Text as="p">
        {currentPage}/{totalPage}
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
