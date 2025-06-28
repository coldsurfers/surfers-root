import { useUserCurrentLocationStore } from '@/features';
import { apiClient } from '@/lib/api/openapi-client';
import { Spinner } from '@coldsurfers/ocean-road/native';
import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { Suspense, forwardRef, useCallback, useMemo, useState } from 'react';
import { FlatList, type ListRenderItem, View } from 'react-native';
import { match } from 'ts-pattern';
import { useShallow } from 'zustand/shallow';
import { CommonListEmpty } from '../common-list-empty';
import { ConcertListItem } from '../concert-list-item';
import { EventCategoryList, EventCategoryListSkeleton } from '../event-category-list/';
import { concertListStyles } from './concert-list.styles';
import type { ConcertListItemType } from './concert-list.types';

type ConcertListProps = {
  onPressItem?: (item: ConcertListItemType) => void;
  onPressSubscribe?: (item: ConcertListItemType, options: { isSubscribed: boolean }) => void;
  eventCategory?: string;
  hideTopMenu?: boolean;
};

const PER_PAGE = 20;

export const ConcertList = forwardRef<FlatList, ConcertListProps>(
  ({ onPressItem, onPressSubscribe, eventCategory, hideTopMenu }, ref) => {
    const [isRefreshing, setIsRefreshing] = useState(false);
    const { latitude, longitude, type, cityId } = useUserCurrentLocationStore(
      useShallow((state) => ({
        latitude: state.latitude,
        longitude: state.longitude,
        type: state.type,
        cityId: state.cityId,
      }))
    );

    const queryParams = useMemo(() => {
      const value: Parameters<typeof apiClient.event.queryKeys.list>[0] = {
        eventCategoryName: eventCategory,
      };
      return match(type)
        .with('current-location', () => {
          if (latitude === null || longitude === null) {
            return value;
          }
          value.latitude = latitude;
          value.longitude = longitude;
          return value;
        })
        .with('city-location', () => {
          if (cityId === null) {
            return value;
          }
          value.locationCityId = cityId;
          return value;
        })
        .otherwise(() => value);
    }, [eventCategory, type, latitude, longitude, cityId]);

    const { data, isPending, fetchNextPage, isFetchingNextPage, hasNextPage, refetch } =
      useSuspenseInfiniteQuery({
        initialPageParam: 0,
        queryKey: apiClient.event.queryKeys.list(queryParams),
        queryFn: ({ pageParam = 0 }) =>
          apiClient.event.getEvents({
            offset: pageParam,
            size: PER_PAGE,
            ...queryParams,
          }),
        getNextPageParam: (lastPage, allPages) => {
          if (lastPage.length < PER_PAGE) {
            return undefined;
          }
          return allPages.length * PER_PAGE;
        },
        refetchOnWindowFocus: false,
      });

    const concertList = useMemo<ConcertListItemType[]>(() => {
      return data.pages.flat().map((data) => data.data);
    }, [data?.pages]);

    const renderItem: ListRenderItem<ConcertListItemType> = useCallback(
      ({ item, index }) => {
        const handlePress = () => onPressItem?.(item);
        const handlePressSubscribe = (params: { isSubscribed: boolean; concertId: string }) =>
          onPressSubscribe?.(item, { isSubscribed: params.isSubscribed });
        const listItemStyle = {
          paddingLeft: index % 2 === 0 ? 0 : 6,
          paddingRight: index % 2 === 0 ? 6 : 0,
        };
        return (
          <ConcertListItem
            data={item}
            onPress={handlePress}
            onPressSubscribe={handlePressSubscribe}
            style={listItemStyle}
          />
        );
      },
      [onPressItem, onPressSubscribe]
    );

    const onEndReached = useCallback(async () => {
      if (isPending || isFetchingNextPage) {
        return;
      }
      if (!hasNextPage) {
        return;
      }
      await fetchNextPage();
    }, [fetchNextPage, hasNextPage, isFetchingNextPage, isPending]);

    const onRefresh = useCallback(async () => {
      setIsRefreshing(true);
      await refetch();
      setIsRefreshing(false);
    }, [refetch]);

    return (
      <FlatList
        scrollsToTop
        ref={ref}
        numColumns={2}
        data={concertList}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={concertListStyles.concertListContentContainer}
        ListEmptyComponent={
          isPending ? (
            <View style={concertListStyles.loadingIndicatorWrapper}>
              <Spinner />
            </View>
          ) : (
            <CommonListEmpty emptyText={'🥺\n앗,\n해당하는\n위치에\n공연 정보가 없어요!'} />
          )
        }
        ListHeaderComponent={
          hideTopMenu ? null : (
            <Suspense fallback={<EventCategoryListSkeleton />}>
              <EventCategoryList />
            </Suspense>
          )
        }
        refreshing={isRefreshing}
        onRefresh={onRefresh}
        ListFooterComponent={isFetchingNextPage ? <Spinner size="medium" /> : null}
        scrollEnabled={!isRefreshing}
        onEndReached={onEndReached}
      />
    );
  }
);
