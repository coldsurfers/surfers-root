import { memo } from 'react'
import { SearchBottomKeywordResultList } from '../search-bottom-keyword-result-list'
import { SearchDefaultBottomResultList } from '../search-default-bottom-result-list'

export const SearchBottomList = memo(
  ({
    debouncedSearchKeyword,
    latitude,
    longitude,
  }: {
    debouncedSearchKeyword: string
    latitude: number | null
    longitude: number | null
  }) => {
    return debouncedSearchKeyword ? (
      <SearchBottomKeywordResultList keyword={debouncedSearchKeyword} />
    ) : (
      <SearchDefaultBottomResultList latitude={latitude} longitude={longitude} />
    )
  },
)
