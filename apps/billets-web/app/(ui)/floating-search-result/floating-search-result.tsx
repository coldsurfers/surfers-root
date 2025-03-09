'use client'

import { apiClient } from '@/libs/openapi-client'
import { useCommonUIStore } from '@/libs/stores'
import { Text } from '@coldsurfers/ocean-road'
import { useQuery } from '@tanstack/react-query'
import { SearchItem } from '../search-item'
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

  if (Array.isArray(data) && data.length === 0) {
    return (
      <SearchResultWrapper>
        <Text>🥺 앗, 해당하는 정보가 없어요!</Text>
      </SearchResultWrapper>
    )
  }

  return (
    <SearchResultWrapper>
      {data.map((item) => (
        <SearchItem key={item.id} {...item} onClick={closeFloatingSearchBar} />
      ))}
    </SearchResultWrapper>
  )
}
