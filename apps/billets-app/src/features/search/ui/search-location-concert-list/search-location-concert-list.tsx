import { colors } from '@coldsurfers/ocean-road'
import { BottomSheetFlatList } from '@gorhom/bottom-sheet'
import { useFocusEffect } from '@react-navigation/native'
import { memo, useCallback, useMemo, useState } from 'react'
import { ActivityIndicator, ListRenderItem, StyleSheet } from 'react-native'
import { SearchFetchItem } from '../search-fetch-item/search-fetch-item'
import { SearchLocationConcertListProps } from './search-location-concert-list.types'

const PER_PAGE = 20

export const SearchLocationConcertList = memo(({ locationConcerts }: SearchLocationConcertListProps) => {
  const [page, setPage] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const visibleConcerts = useMemo(() => {
    return locationConcerts.slice(0, page * PER_PAGE)
  }, [locationConcerts, page])

  const hasNextPage = useMemo(() => {
    return locationConcerts.length > page * PER_PAGE
  }, [locationConcerts, page])

  const fetchNextPage = useCallback(() => {
    setPage((prev) => prev + 1)
  }, [])

  const onEndReached = useCallback(async () => {
    if (!hasNextPage) {
      return
    }
    setIsLoading(true)
    const sleep = () => new Promise((resolve) => setTimeout(() => resolve(true), 600))
    await sleep()
    fetchNextPage()
    setIsLoading(false)
  }, [fetchNextPage, hasNextPage])

  const renderItem = useCallback<ListRenderItem<(typeof visibleConcerts)[number]>>(
    ({ item }) => <SearchFetchItem concertId={item.id} />,
    [],
  )

  return (
    <BottomSheetFlatList
      data={visibleConcerts}
      renderItem={renderItem}
      bounces={false}
      focusHook={useFocusEffect}
      keyExtractor={(item) => item.id}
      onEndReached={onEndReached}
      style={styles.list}
      contentContainerStyle={styles.contentContainer}
      ListFooterComponent={isLoading ? <ActivityIndicator animating style={styles.indicator} /> : null}
    />
  )
})

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
    paddingVertical: 12,
    paddingBottom: 120,
    paddingHorizontal: 14,
    backgroundColor: colors.oc.gray[1].value,
  },
  indicator: { paddingTop: 24 },
})
