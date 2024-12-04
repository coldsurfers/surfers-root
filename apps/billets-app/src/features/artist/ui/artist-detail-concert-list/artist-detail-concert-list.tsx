import { useArtistConcertListQuery } from '@/lib/react-query'
import { useCallback, useMemo } from 'react'
import { ActivityIndicator, FlatList, ListRenderItem, StyleSheet, View } from 'react-native'
import { ArtistDetailConcertListItem } from '../artist-detail-concert-list-item'
import { ArtistDetailTop } from '../artist-detail-top'

export const ArtistDetailConcertList = ({
  artistId,
  onPressItem,
}: {
  artistId: string
  onPressItem?: (params: { concertId: string }) => void
}) => {
  const {
    data: artistConcertList,
    isPending: isPendingArtistConcertList,
    isFetchingNextPage: isFetchingNextPageArtistConcerList,
    hasNextPage: hasNextPageArtistConcertList,
    fetchNextPage: fetchNextPageArtistConcertList,
  } = useArtistConcertListQuery({
    artistId,
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
      ListHeaderComponent={<ArtistDetailTop artistId={artistId} />}
      data={artistConcertListUIData}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.contentContainer}
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
