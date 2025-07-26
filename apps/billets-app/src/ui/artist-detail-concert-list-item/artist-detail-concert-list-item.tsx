import { ConcertSubscribeButton } from '@/features/subscribe/components';
import { useToggleSubscribeConcert } from '@/features/subscribe/hooks/useToggleSubscribeConcert';
import { apiClient } from '@/lib/api/openapi-client';
import { useVenueDetailScreenNavigation } from '@/screens/venue-detail-screen/venue-detail-screen.hooks';
import { ProfileThumbnail } from '@coldsurfers/ocean-road/native';
import { useQuery } from '@tanstack/react-query';
import format from 'date-fns/format';
import { HorizontalConcertItem } from '../horizontal-concert-item';
import type { ArtistDetailConcertListItemProps } from './artist-detail-concert-list-item.types';

export const ArtistDetailConcertListItem = ({
  item,
  onPress,
}: ArtistDetailConcertListItemProps) => {
  const toggleSubscribe = useToggleSubscribeConcert();
  const { data: eventSubscribeData } = useQuery({
    queryKey: apiClient.subscribe.queryKeys.eventSubscribe({ eventId: item.id }),
    queryFn: () => apiClient.subscribe.getEvent({ eventId: item.id }),
  });
  const { data: meData } = useQuery({
    queryKey: apiClient.user.queryKeys.me,
    queryFn: () => apiClient.user.getMe(),
  });
  const navigation = useVenueDetailScreenNavigation();
  const isLoggedIn = !!meData;
  return (
    <HorizontalConcertItem
      onPress={() => onPress(item)}
      title={item.title}
      subtitle={format(item.date ? new Date(item.date) : new Date(), 'EEE, MMM dd')}
      description={item.mainVenue?.name ?? ''}
      thumbnailComponent={
        <ProfileThumbnail
          type="square"
          emptyBgText={item.title.at(0) ?? ''}
          imageUrl={item.mainPoster?.url ?? ''}
          size="md"
        />
      }
      bottomRightAddOn={
        <ConcertSubscribeButton
          onPress={() => {
            if (!isLoggedIn) {
              navigation.navigate('LoginStackNavigation', {
                screen: 'LoginSelectionScreen',
                params: {},
              });
              return;
            }
            toggleSubscribe({
              eventId: item.id,
              isSubscribed: !!eventSubscribeData,
            });
          }}
          isSubscribed={!!eventSubscribeData}
        />
      }
    />
  );
};
