import { apiClient } from '@/lib/api/openapi-client';
import type { components } from '@coldsurfers/api-sdk';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { FlatList, type ListRenderItem, StyleSheet } from 'react-native';
import { EventCategoryListItem } from './event-category-list.item';

const renderItem: ListRenderItem<components['schemas']['EventCategoryDTOSchema']> = ({ item }) => (
  <EventCategoryListItem {...item} />
);

const styles = StyleSheet.create({
  list: {
    marginBottom: 12,
  },
});

export const EventCategoryList = () => {
  const { data: eventCategoriesData } = useSuspenseQuery({
    queryKey: apiClient.eventCategory.queryKeys.list,
    queryFn: () => apiClient.eventCategory.getEventCategories(),
  });
  const data = useMemo(() => eventCategoriesData ?? [], [eventCategoriesData]);
  return (
    <FlatList
      horizontal
      data={data}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      style={styles.list}
    />
  );
};
