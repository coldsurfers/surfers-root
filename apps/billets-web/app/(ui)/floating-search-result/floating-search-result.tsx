'use client'

import { apiClient } from '@/libs/openapi-client'
import { useCommonUIStore } from '@/libs/stores'
import { Text } from '@coldsurfers/ocean-road'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import { match } from 'ts-pattern'
import { SearchResultWrapper } from './floating-search-result.styled'

interface FloatingSearchResultProps {
  keyword: string
}

export const FloatingSearchResult = ({ keyword }: FloatingSearchResultProps) => {
  const { closeFloatingSearchBar } = useCommonUIStore()
  const { data } = useQuery({
    queryKey: apiClient.search.queryKeys.list(keyword),
    queryFn: () => apiClient.search.getSearchResult(keyword),
    enabled: !!keyword,
  })

  if (!data) {
    return null
  }

  return (
    <SearchResultWrapper>
      {data?.map((item) => {
        return match(item)
          .when(
            (value) => value.type === 'artist',
            (value) => {
              return (
                <Link key={value.id} href={`/artist/${value.id}`} onClick={closeFloatingSearchBar}>
                  <Text>{value.name}</Text>
                </Link>
              )
            },
          )
          .when(
            (value) => value.type === 'concert',
            (value) => {
              return (
                <Link key={value.id} href={`/event/${value.id}`} onClick={closeFloatingSearchBar}>
                  <Text>{value.title}</Text>
                </Link>
              )
            },
          )
          .when(
            (value) => value.type === 'venue',
            (value) => {
              return (
                <Link key={value.id} href={`/venue/${value.id}`} onClick={closeFloatingSearchBar}>
                  <Text>{value.name}</Text>
                </Link>
              )
            },
          )
          .otherwise(() => null)
      })}
    </SearchResultWrapper>
  )
}
