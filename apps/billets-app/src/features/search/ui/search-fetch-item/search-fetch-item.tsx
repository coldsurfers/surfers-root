import { $api } from '@/lib/api/openapi-client'
import { useSearchScreenNavigation } from '@/screens/search-screen/search-screen.hooks'
import format from 'date-fns/format'
import { useMemo } from 'react'
import { SearchItem } from '../search-item'
import { SearchItemThumbnail } from '../search-item-thumbnail'
import { SearchItemProps } from '../search-item/search-item.types'

export const SearchFetchItem = ({ concertId }: { concertId: string }) => {
  const navigation = useSearchScreenNavigation()
  const { data, isLoading } = $api.useQuery('get', '/v1/concert/{id}', {
    params: {
      path: {
        id: concertId,
      },
    },
  })

  const uiData = useMemo<SearchItemProps | null>(() => {
    if (!data || isLoading) {
      return null
    }
    return {
      type: 'concert',
      thumbnail: <SearchItemThumbnail type="square" uri={data.posters?.at(0)?.imageUrl ?? ''} />,
      title: data.title ?? '',
      subtitle: format(new Date(data?.date), 'EEE, MMM dd'),
      description: data.venues.at(0)?.venueTitle ?? '',
      onPress: () =>
        navigation.navigate('ConcertStackNavigation', {
          screen: 'ConcertDetailScreen',
          params: { concertId: data.id },
        }),
    }
  }, [data, isLoading, navigation])

  if (!uiData) {
    return <SearchItem.Skeleton />
  }

  return <SearchItem {...uiData} />
}
