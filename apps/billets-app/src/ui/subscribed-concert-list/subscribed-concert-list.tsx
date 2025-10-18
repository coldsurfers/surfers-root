import { apiClient } from '@/lib/api/openapi-client';
import { Spinner, useColorScheme } from '@coldsurfers/ocean-road/native';
import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { useCallback, useMemo, useState } from 'react';
import { FlatList, type ListRenderItem, StyleSheet, View } from 'react-native';
import { SubscribedConcertListItem } from '../subscribed-concert-list-item';
import { subscribedConcertListStyles } from './subscribed-concert-list.styles';

const ItemSeparator = () => <View style={subscribedConcertListStyles.itemSeparator} />;

const PER_PAGE = 20;

export function SubscribedConcertList({
  onPressItem,
  horizontal = true,
  listHeaderComponent,
}: {
  onPressItem: (concertId: string) => void;
  horizontal?: boolean;
  listHeaderComponent?: React.ComponentType<unknown>;
}) {
  const { semantics } = useColorScheme();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const {
    data: concertListData,
    fetchNextPage,
    isFetchingNextPage,
    isLoading,
    hasNextPage,
    isPending,
    refetch,
  } = useSuspenseInfiniteQuery({
    initialPageParam: 0,
    queryKey: apiClient.subscribe.queryKeys.eventList({}),
    queryFn: ({ pageParam = 0 }) =>
      apiClient.subscribe.getEventList({ offset: pageParam, size: PER_PAGE }),
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage) {
        return undefined;
      }
      if (lastPage.length < PER_PAGE) {
        return undefined;
      }
      return allPages.length * PER_PAGE;
    },
  });
  const listData = useMemo(() => {
    return concertListData?.pages.flat() ?? [];
  }, [concertListData]);
  const renderItem = useCallback<ListRenderItem<(typeof listData)[number]>>(
    ({ item, index }) => {
      return (
        <SubscribedConcertListItem
          index={index}
          data={item}
          onPress={onPressItem}
          size={horizontal ? 'small' : 'large'}
          horizontal={horizontal}
        />
      );
    },
    [horizontal, onPressItem]
  );

  const onEndReached = useCallback(async () => {
    if (horizontal) {
      return;
    }
    if (isFetchingNextPage || isLoading || !hasNextPage || isPending) {
      return;
    }
    await fetchNextPage();
  }, [fetchNextPage, hasNextPage, horizontal, isFetchingNextPage, isLoading, isPending]);

  const onRefresh = useCallback(async () => {
    setIsRefreshing(true);
    await refetch();
    setIsRefreshing(false);
  }, [refetch]);

  return (
    <FlatList
      horizontal={horizontal}
      numColumns={horizontal ? 1 : 2}
      data={listData}
      keyExtractor={(item) => `${item.eventId}`}
      renderItem={renderItem}
      ItemSeparatorComponent={ItemSeparator}
      contentContainerStyle={[
        {
          backgroundColor: semantics.background[3],
        },
        styles.contentContainer,
      ]}
      ListFooterComponent={isFetchingNextPage ? <Spinner size="medium" /> : null}
      ListFooterComponentStyle={styles.listFooter}
      ListHeaderComponent={listHeaderComponent}
      onEndReached={horizontal ? undefined : onEndReached}
      onRefresh={horizontal ? undefined : onRefresh}
      refreshing={horizontal ? undefined : isRefreshing}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      bounces={!horizontal}
      style={{
        backgroundColor: semantics.background[3],
      }}
    />
  );
}

const styles = StyleSheet.create({
  contentContainer: { paddingHorizontal: 16, paddingBottom: 24, marginTop: 12 },
  listFooter: {
    paddingBottom: 24,
  },
});
