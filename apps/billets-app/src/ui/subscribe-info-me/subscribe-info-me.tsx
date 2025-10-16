import { useMeQuery } from '@/features/auth/hooks/useMeQuery';
import { apiClient } from '@/lib/api/openapi-client';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useCallback, useMemo } from 'react';
import { FlatList, type ListRenderItem, StyleSheet } from 'react-native';
import { SubscribeInfoMeItem } from './subscribe-info-me.item';

export const SubscribeInfoMe = () => {
  const { data: meData } = useMeQuery();
  const { data: userProfile } = useSuspenseQuery({
    queryKey: apiClient.user.queryKeys.profile(meData?.handle ?? ''),
    queryFn: () => apiClient.user.getUserProfile(meData?.handle ?? ''),
  });
  const subscribedEvents = useMemo(() => {
    return userProfile.subscribedEvents.map((event) => {
      const thumbUrl = event.data.mainPoster?.url ? `${event.data.mainPoster.url}` : '';
      return {
        date: event.data.date,
        thumbUrl,
        title: event.data.title,
        venue: event.data.mainVenue?.name ?? '',
        eventId: event.data.id,
      };
    });
  }, [userProfile]);

  const renderItem = useCallback<ListRenderItem<(typeof subscribedEvents)[number]>>(({ item }) => {
    return (
      <SubscribeInfoMeItem
        type="events"
        count={0}
        thumbUrl={item.thumbUrl}
        title={item.title}
        eventId={item.eventId}
      />
    );
  }, []);

  return (
    <FlatList
      horizontal
      data={subscribedEvents.slice(0, 10)}
      renderItem={renderItem}
      keyExtractor={(item) => `${item.title}`}
      style={styles.list}
      contentContainerStyle={styles.contentList}
      showsHorizontalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
  contentList: {
    paddingHorizontal: 16,
    marginTop: 16,
  },
});
