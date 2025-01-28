'use client'

import { initialPageQuery } from '@/libs/openapi-client'
import { useInfiniteQuery } from '@tanstack/react-query'
import { memo, useCallback, useMemo } from 'react'
import { ConcertListItem } from './concert-list.item'
import { ConcertListLoadMore } from './concert-list.load-more'
import { StyledGridContainer, StyledListContainer, StyledListHeader, StyledListHeaderText } from './concert-list.styled'

type ConcertListProps = {
  cityData: {
    readonly id: string
    readonly lat: number
    readonly lng: number
    readonly name: string
    readonly uiName: string
  }
}

export const ConcertList = memo(({ cityData }: ConcertListProps) => {
  const { data, fetchNextPage, isFetchingNextPage, isFetching, hasNextPage } = useInfiniteQuery(
    initialPageQuery.browseByCity(cityData),
  )

  const pages = useMemo(() => {
    return data?.pages.flat()
  }, [data?.pages])

  const loadMore = useCallback(() => {
    if (!hasNextPage || isFetchingNextPage || isFetching) {
      return
    }
    fetchNextPage()
  }, [fetchNextPage, hasNextPage, isFetching, isFetchingNextPage])

  return (
    <StyledListContainer>
      <StyledListHeader>
        <StyledListHeaderText as="h1">Upcoming Shows in {cityData.uiName}</StyledListHeaderText>
      </StyledListHeader>
      <StyledGridContainer>
        {pages?.map((item) => {
          if (item.type !== 'concert') {
            return null
          }
          return <ConcertListItem key={item.data.id} data={item.data} />
        })}
      </StyledGridContainer>
      {hasNextPage && <ConcertListLoadMore onLoadMore={loadMore} />}
    </StyledListContainer>
  )
})
