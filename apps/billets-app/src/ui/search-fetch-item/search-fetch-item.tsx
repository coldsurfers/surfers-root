import { apiClient } from '@/lib/api/openapi-client';
import { useSearchScreenNavigation } from '@/screens/search-screen/search-screen.hooks';
import { useQuery } from '@tanstack/react-query';
import format from 'date-fns/format';
import { useMemo } from 'react';
import { SearchItem } from '../search-item';
import { SearchItemThumbnail } from '../search-item-thumbnail';
import type { SearchItemProps } from '../search-item/search-item.types';

export const SearchFetchItem = ({ concertId }: { concertId: string }) => {
  const navigation = useSearchScreenNavigation();
  const { data } = useQuery({
    queryKey: apiClient.event.queryKeys.detail(concertId),
    queryFn: () => apiClient.event.getEventDetail(concertId),
  });
  const uiData = useMemo<SearchItemProps | null>(() => {
    if (!data || data.type !== 'concert') {
      return null;
    }
    const { data: concertDetail } = data;
    return {
      type: 'concert',
      thumbnail: <SearchItemThumbnail type="square" uri={concertDetail.posters.at(0)?.url ?? ''} />,
      title: concertDetail.title,
      subtitle: format(new Date(concertDetail.date), 'EEE, MMM dd'),
      description: concertDetail.venues?.at(0)?.name ?? '',
      onPress: () =>
        navigation.navigate('EventStackNavigation', {
          screen: 'EventDetailScreen',
          params: { eventId: concertDetail.id },
        }),
    };
  }, [data, navigation]);

  if (!uiData) {
    return <SearchItem.Skeleton />;
  }

  return <SearchItem {...uiData} />;
};
