import { apiClient } from '@/lib/api/openapi-client';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useCallback, useMemo } from 'react';
import { FlatList, type ListRenderItem, StyleSheet } from 'react-native';
import { SubscribeInfoMeItem } from './subscribe-info-me.item';
import { InfoMeItemTypeSchema } from './subscribe-info-me.types';

export const SubscribeInfoMe = () => {
  const { data: subscribeInfoMe } = useSuspenseQuery({
    queryKey: apiClient.subscribe.queryKeys.infoMe,
    queryFn: () => apiClient.subscribe.getInfoMe(),
  });
  const data = useMemo(
    () =>
      Object.entries(subscribeInfoMe)
        .map(([key, value]) => {
          return {
            type: key,
            value,
          };
        })
        .sort((a, b) => a.type.localeCompare(b.type)),
    [subscribeInfoMe]
  );
  const renderItem = useCallback<ListRenderItem<(typeof data)[number]>>(({ item }) => {
    const validation = InfoMeItemTypeSchema.safeParse(item.type);
    if (!validation.success) {
      console.error(validation.error);
      return null;
    }
    return (
      <SubscribeInfoMeItem
        type={validation.data}
        count={item.value.count}
        thumbUrl={item.value.thumbUrl ?? ''}
      />
    );
  }, []);

  return (
    <FlatList
      horizontal
      data={data}
      renderItem={renderItem}
      keyExtractor={(item) => `${item.type}`}
      style={styles.list}
      contentContainerStyle={styles.contentList}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
  contentList: {
    paddingHorizontal: 16,
  },
});
