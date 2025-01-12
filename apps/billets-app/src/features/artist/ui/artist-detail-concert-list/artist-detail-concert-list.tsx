import { apiClient } from '@/lib/api/openapi-client'
import { useSuspenseInfiniteQuery } from '@tanstack/react-query'
import { useCallback, useMemo } from 'react'
import { ActivityIndicator, FlatList, ListRenderItem, StyleSheet, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { ArtistDetailConcertListItem } from '../artist-detail-concert-list-item'
import { ArtistDetailTop } from '../artist-detail-top'

const PER_PAGE = 20

export const ArtistDetailConcertList = ({
  artistId,
  onPressItem,
  onPressArtistProfile,
}: {
  artistId: string
  onPressItem?: (params: { concertId: string }) => void
  onPressArtistProfile?: () => void
}) => {
  const { bottom: bottomInset, top: topInset } = useSafeAreaInsets()
  const {
    data: artistConcertList,
    isPending: isPendingArtistConcertList,
    isFetchingNextPage: isFetchingNextPageArtistConcerList,
    hasNextPage: hasNextPageArtistConcertList,
    fetchNextPage: fetchNextPageArtistConcertList,
  } = useSuspenseInfiniteQuery({
    initialPageParam: 0,
    queryKey: apiClient.queryKeys.concert.listByArtistId(artistId),
    queryFn: ({ pageParam = 0 }) =>
      apiClient.concert.getConcertsByArtistId({ artistId, offset: pageParam, size: PER_PAGE }),
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage) {
        return undefined
      }
      if (lastPage.length < PER_PAGE) {
        return undefined
      }
      return allPages.length * PER_PAGE
    },
  })
  const artistConcertListUIData = useMemo(() => {
    return artistConcertList?.pages.flat() ?? []
  }, [artistConcertList?.pages])

  const isInitialLoading = isPendingArtistConcertList

  const renderItem = useCallback<ListRenderItem<(typeof artistConcertListUIData)[number]>>(
    (info) => {
      return <ArtistDetailConcertListItem item={info.item} onPress={() => onPressItem?.({ concertId: info.item.id })} />
    },
    [onPressItem],
  )

  const onEndReached = useCallback(async () => {
    if (isPendingArtistConcertList || isFetchingNextPageArtistConcerList || !hasNextPageArtistConcertList) {
      return
    }
    await fetchNextPageArtistConcertList()
  }, [
    fetchNextPageArtistConcertList,
    hasNextPageArtistConcertList,
    isFetchingNextPageArtistConcerList,
    isPendingArtistConcertList,
  ])

  if (isInitialLoading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator animating />
      </View>
    )
  }

  return (
    <FlatList
      ListHeaderComponent={<ArtistDetailTop artistId={artistId} onPressArtistProfile={onPressArtistProfile} />}
      data={artistConcertListUIData}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      contentContainerStyle={[
        styles.contentContainer,
        { paddingBottom: bottomInset ? bottomInset : 12, paddingTop: topInset ? topInset : 12 },
      ]}
      onEndReached={onEndReached}
    />
  )
}

const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: 12,
  },
  loading: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
