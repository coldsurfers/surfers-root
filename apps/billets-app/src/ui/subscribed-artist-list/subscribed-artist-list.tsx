import { apiClient } from '@/lib/api/openapi-client';
import { useSubscribedArtistListScreenNavigation } from '@/screens/subscribed-artist-list-screen/subscribed-artist-list-screen.hooks';
import { Spinner, useColorScheme } from '@coldsurfers/ocean-road/native';
import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { Suspense, useCallback, useMemo, useState } from 'react';
import { FlatList, type ListRenderItem, StyleSheet, View } from 'react-native';
import { SubscribedArtistListItem } from '../subscribed-artist-list-item';
import { subscribedArtistListStyles } from './subscribed-artist-list.styles';

const ItemSeparator = () => <View style={subscribedArtistListStyles.itemSeparator} />;

const PER_PAGE = 20;

export function SubscribedArtistList({
  listHeaderComponent,
}: { listHeaderComponent?: React.ComponentType<unknown> }) {
  const { semantics } = useColorScheme();
  const navigation = useSubscribedArtistListScreenNavigation();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { data, fetchNextPage, isFetchingNextPage, isLoading, hasNextPage, isPending, refetch } =
    useSuspenseInfiniteQuery({
      initialPageParam: 0,
      queryKey: apiClient.subscribe.queryKeys.artistList({}),
      queryFn: ({ pageParam = 0 }) =>
        apiClient.subscribe.getArtistList({ offset: pageParam, size: PER_PAGE }),
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
    return data?.pages.flat() ?? [];
  }, [data]);
  const renderItem = useCallback<ListRenderItem<(typeof listData)[number]>>(
    ({ item }) => {
      const onPress = () => {
        navigation.navigate('ArtistStackNavigation', {
          params: {
            artistId: item.artistId,
          },
          screen: 'ArtistDetailScreen',
        });
      };
      return (
        <Suspense>
          <SubscribedArtistListItem data={item} onPress={onPress} />
        </Suspense>
      );
    },
    [navigation]
  );

  const onEndReached = useCallback(async () => {
    if (isFetchingNextPage || isLoading || !hasNextPage || isPending) {
      return;
    }
    await fetchNextPage();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isPending]);

  const onRefresh = useCallback(async () => {
    setIsRefreshing(true);
    await refetch();
    setIsRefreshing(false);
  }, [refetch]);

  return (
    <FlatList
      data={listData}
      keyExtractor={(item) => `${item.artistId}`}
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
      onEndReached={onEndReached}
      onRefresh={onRefresh}
      refreshing={isRefreshing}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      style={{
        backgroundColor: semantics.background[3],
      }}
    />
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: 16,
    paddingBottom: 24,
    marginTop: 12,
  },
  listFooter: {
    paddingBottom: 24,
  },
});
