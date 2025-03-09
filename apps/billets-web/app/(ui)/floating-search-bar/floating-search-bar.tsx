'use client'

import { GLOBAL_Z_INDEX } from '@/libs/constants'
import { apiClient } from '@/libs/openapi-client'
import { useCommonUIStore } from '@/libs/stores'
import { Modal } from '@coldsurfers/ocean-road'
import { useQuery } from '@tanstack/react-query'
import { useDebounce } from '@uidotdev/usehooks'
import { useState } from 'react'
import { FloatingSearchBarWrapper, FloatingSearchTextInput } from './floating-search-bar.styled'

export const FloatingSearchBar = () => {
  const { floatingSearchBarVisible, closeFloatingSearchBar } = useCommonUIStore()
  const [keyword, setKeyword] = useState<string>('')
  const debouncedSearchKeyword = useDebounce(keyword, 350)
  const { data } = useQuery({
    queryKey: apiClient.search.queryKeys.list(debouncedSearchKeyword),
    queryFn: () => apiClient.search.getSearchResult(debouncedSearchKeyword),
    enabled: !!debouncedSearchKeyword,
  })
  return (
    <Modal visible={floatingSearchBarVisible} onClose={closeFloatingSearchBar} zIndex={GLOBAL_Z_INDEX.APP_HEADER + 1}>
      <FloatingSearchBarWrapper>
        <FloatingSearchTextInput
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          autoFocus
          placeholder="🔎 어떤 공연을 찾고 싶으세요?"
        />
      </FloatingSearchBarWrapper>
    </Modal>
  )
}
