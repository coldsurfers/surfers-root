import { useToggleSubscribeConcert } from '@/features/subscribe/hooks/useToggleSubscribeConcert';
import { apiClient } from '@/lib/api/openapi-client';
import { useVenueDetailScreenNavigation } from '@/screens/venue-detail-screen/venue-detail-screen.hooks';
import { useQuery, useSuspenseQuery } from '@tanstack/react-query';
import { useCallback, useMemo } from 'react';
import { ActivityIndicator, FlatList, type ListRenderItem, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { VenueDetailConcertListItem } from '../venue-detail-concert-list-item';
import { VenueDetailTop } from '../venue-detail-top';

export const VenueDetailConcertList = ({
  venueId,
  onPressItem,
}: {
  venueId: string;
  onPressItem?: (params: { eventId: string }) => void;
}) => {
  const navigation = useVenueDetailScreenNavigation();
  const { bottom: bottomInset } = useSafeAreaInsets();
  const { data: venueDetail, isLoading: isLoadingVenueDetail } = useSuspenseQuery({
    queryKey: apiClient.venue.queryKeys.detail(venueId),
    queryFn: () => apiClient.venue.getVenueDetail(venueId),
  });
  const upcomingEvents = useMemo(() => {
    return venueDetail.upcomingEvents
      .filter((value) => value.type === 'concert')
      .map((value) => {
        return value.data;
      });
  }, [venueDetail.upcomingEvents]);
  const { data: meData } = useQuery({
    queryKey: apiClient.user.queryKeys.me,
    queryFn: () => apiClient.user.getMe(),
  });
  const toggleSubscribeConcert = useToggleSubscribeConcert();

  const renderItem = useCallback<ListRenderItem<(typeof upcomingEvents)[number]>>(
    ({ item }) => {
      return (
        <VenueDetailConcertListItem
          item={item}
          onPress={() => onPressItem?.({ eventId: item.id })}
          onPressSubscribe={({ concertId, isSubscribed }) => {
            if (!meData) {
              navigation.navigate('LoginStackNavigation', {
                screen: 'LoginSelectionScreen',
                params: {},
              });
              return;
            }
            toggleSubscribeConcert({
              eventId: concertId,
              isSubscribed,
            });
          }}
        />
      );
    },
    [meData, navigation, onPressItem, toggleSubscribeConcert]
  );

  if (isLoadingVenueDetail) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator animating />
      </View>
    );
  }

  return (
    <FlatList
      ListHeaderComponent={<VenueDetailTop venueId={venueId} />}
      data={upcomingEvents}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      contentContainerStyle={[styles.contentContainer, { paddingBottom: bottomInset }]}
      style={styles.list}
    />
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: 12,
    flexGrow: 1,
  },
  loading: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
  list: { flex: 1 },
});
