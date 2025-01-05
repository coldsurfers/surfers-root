import useConcertListQuery from '@/lib/react-query/queries/useConcertListQuery'
import { CommonListEmpty } from '@/ui'
import { colors } from '@coldsurfers/ocean-road'
import { Spinner } from '@coldsurfers/ocean-road/native'
import { format } from 'date-fns'
import { forwardRef, useCallback, useMemo, useState } from 'react'
import { FlatList, ListRenderItem, RefreshControl, View } from 'react-native'
import { ConcertListItem } from '../concert-list-item'
import { concertListStyles } from './concert-list.styles'
import { ConcertListItemT } from './concert-list.types'

type ConcertListProps = {
  onPressItem?: (item: ConcertListItemT) => void
  onPressSubscribe?: (item: ConcertListItemT, options: { isSubscribed: boolean }) => void
  latitude: number
  longitude: number
}

export const ConcertList = forwardRef<FlatList, ConcertListProps>(
  ({ onPressItem, onPressSubscribe, latitude, longitude }, ref) => {
    const [isRefreshing, setIsRefreshing] = useState(false)

    const {
      data: concertListData,
      isPending: isPendingConcertList,
      fetchNextPage: fetchNextConcertList,
      isFetchingNextPage: isFetchingNextConcertList,
      hasNextPage: hasNextConcertListPage,
      refetch: refetchConcertList,
    } = useConcertListQuery(
      {
        latLng: {
          latitude,
          longitude,
        },
      },
      {
        refetchOnWindowFocus: false,
      },
    )
    const concertList = useMemo(() => {
      return concertListData?.pages.flat() ?? []
    }, [concertListData])

    const renderItem: ListRenderItem<ConcertListItemT> = useCallback(
      (info) => {
        return (
          <ConcertListItem
            concertId={info.item.id}
            thumbnailUrl={info.item.posters.at(0)?.imageUrl ?? ''}
            title={info.item.title}
            date={format(new Date(info.item.date), 'EEE, MMM d')}
            venue={info.item.venues.at(0)?.venueTitle}
            onPress={() => onPressItem?.(info.item)}
            onPressSubscribe={({ isSubscribed }) => onPressSubscribe?.(info.item, { isSubscribed })}
          />
        )
      },
      [onPressItem, onPressSubscribe],
    )

    const onEndReached = useCallback(async () => {
      if (isPendingConcertList || isFetchingNextConcertList) {
        return
      }
      if (!hasNextConcertListPage) {
        return
      }
      await fetchNextConcertList()
    }, [fetchNextConcertList, hasNextConcertListPage, isFetchingNextConcertList, isPendingConcertList])

    const onRefresh = useCallback(async () => {
      setIsRefreshing(true)
      await refetchConcertList()
      setIsRefreshing(false)
    }, [refetchConcertList])

    return (
      <FlatList
        scrollsToTop
        ref={ref}
        data={concertList}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={concertListStyles.concertListContentContainer}
        ListEmptyComponent={
          isPendingConcertList ? (
            <View style={concertListStyles.loadingIndicatorWrapper}>
              <Spinner />
            </View>
          ) : (
            <CommonListEmpty emptyText={`🥺\n앗,\n해당하는\n위치에\n공연 정보가 없어요!`} />
          )
        }
        ListFooterComponent={isFetchingNextConcertList ? <Spinner /> : null}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={onRefresh}
            tintColor={colors.oc.cyan[5].value}
            size={20}
          />
        }
        scrollEnabled={!isRefreshing}
        onEndReached={onEndReached}
      />
    )
  },
)
