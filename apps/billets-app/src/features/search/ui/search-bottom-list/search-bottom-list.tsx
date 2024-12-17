import { memo } from 'react'
import { SearchStoreLocationConcert } from '../../store'
import { SearchBottomKeywordResultList } from '../search-bottom-keyword-result-list'
import { SearchDefaultBottomResultList } from '../search-default-bottom-result-list'
import { SearchLocationConcertList } from '../search-location-concert-list'

export const SearchBottomList = memo(
  ({
    debouncedSearchKeyword,
    latitude,
    longitude,
    locationConcerts,
  }: {
    debouncedSearchKeyword: string
    latitude: number | null
    longitude: number | null
    locationConcerts: SearchStoreLocationConcert[]
  }) => {
    if (debouncedSearchKeyword) {
      return <SearchBottomKeywordResultList keyword={debouncedSearchKeyword} />
    }
    if (locationConcerts.length > 0) {
      return <SearchLocationConcertList locationConcerts={locationConcerts} />
    }
    return <SearchDefaultBottomResultList latitude={latitude} longitude={longitude} />
  },
)
