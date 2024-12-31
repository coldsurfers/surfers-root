import { memo } from 'react'
import { SearchStoreLocationConcert, SearchStoreLocationFilterType } from '../../store'
import { SearchBottomKeywordResultList } from '../search-bottom-keyword-result-list'
import { SearchDefaultBottomResultList } from '../search-default-bottom-result-list'
import { SearchLocationConcertList } from '../search-location-concert-list'

export const SearchBottomList = memo(
  ({
    debouncedSearchKeyword,
    latitude,
    longitude,
    locationConcerts,
    selectedLocationFilter,
  }: {
    debouncedSearchKeyword: string
    latitude: number | null
    longitude: number | null
    locationConcerts: SearchStoreLocationConcert[] | null
    selectedLocationFilter: SearchStoreLocationFilterType | null
  }) => {
    if (debouncedSearchKeyword) {
      return <SearchBottomKeywordResultList keyword={debouncedSearchKeyword} />
    }
    if (selectedLocationFilter === 'map-location' && Array.isArray(locationConcerts)) {
      return <SearchLocationConcertList locationConcerts={locationConcerts} />
    }
    if (latitude !== null && longitude !== null) {
      return <SearchDefaultBottomResultList latitude={latitude} longitude={longitude} />
    }
    return null
  },
)
