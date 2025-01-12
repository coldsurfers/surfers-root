import { apiClient } from '@/lib/api/openapi-client'
import { useSearchScreenNavigation } from '@/screens/search-screen/search-screen.hooks'
import { useQuery } from '@tanstack/react-query'
import format from 'date-fns/format'
import { useMemo } from 'react'
import { SearchItem } from '../search-item'
import { SearchItemThumbnail } from '../search-item-thumbnail'
import { SearchItemProps } from '../search-item/search-item.types'

export const SearchFetchItem = ({ concertId }: { concertId: string }) => {
  const navigation = useSearchScreenNavigation()
  const { data, isLoading } = useQuery({
    queryKey: apiClient.queryKeys.concert.detail(concertId),
    queryFn: () => apiClient.concert.getConcertDetail(concertId),
  })
  const { data: posters } = useQuery({
    queryKey: apiClient.queryKeys.poster.listByConcertId(concertId),
    queryFn: () => apiClient.poster.getPostersByConcertId(concertId),
  })
  const { data: venues } = useQuery({
    queryKey: apiClient.queryKeys.venue.listByConcertId(concertId),
    queryFn: () => apiClient.venue.getVenuesByConcertId(concertId),
  })

  const uiData = useMemo<SearchItemProps | null>(() => {
    if (!data || isLoading) {
      return null
    }
    return {
      type: 'concert',
      thumbnail: <SearchItemThumbnail type="square" uri={posters?.at(0)?.url ?? ''} />,
      title: data.title ?? '',
      subtitle: format(data.date ? new Date(data.date) : new Date(), 'EEE, MMM dd'),
      description: venues?.at(0)?.name ?? '',
      onPress: () =>
        navigation.navigate('ConcertStackNavigation', {
          screen: 'ConcertDetailScreen',
          params: { concertId: data.id },
        }),
    }
  }, [data, isLoading, navigation, posters, venues])

  if (!uiData) {
    return <SearchItem.Skeleton />
  }

  return <SearchItem {...uiData} />
}
