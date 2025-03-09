'use client'

import { apiClient } from '@/libs/openapi-client'
import { useCommonUIStore } from '@/libs/stores'
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

  return (
    <SearchResultWrapper>
      {data?.map((item) => <SearchItem key={item.id} {...item} onClick={closeFloatingSearchBar} />)}
    </SearchResultWrapper>
  )
}
