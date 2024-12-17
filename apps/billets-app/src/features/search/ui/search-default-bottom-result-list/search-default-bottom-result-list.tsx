import useConcertListQuery from '@/lib/react-query/queries/useConcertListQuery'
import { useSearchScreenNavigation } from '@/screens/search-screen/search-screen.hooks'
import { colors } from '@coldsurfers/ocean-road'
import { Text } from '@coldsurfers/ocean-road/native'
import { BottomSheetFlatList } from '@gorhom/bottom-sheet'
import { useFocusEffect } from '@react-navigation/native'
import format from 'date-fns/format'
import { useCallback, useMemo } from 'react'
import { ListRenderItem, StyleSheet } from 'react-native'
import { SearchItem } from '../search-item'
import { SearchItemThumbnail } from '../search-item-thumbnail'

export const SearchDefaultBottomResultList = ({
  latitude,
  longitude,
}: {
  latitude: number | null
  longitude: number | null
}) => {
  const navigation = useSearchScreenNavigation()
  const { data: concertList } = useConcertListQuery(
    {
      latLng: {
        latitude: latitude!,
        longitude: longitude!,
      },
    },
    {
      enabled: !!latitude && !!longitude,
      refetchOnWindowFocus: false,
    },
  )
  const concertListUIData = useMemo(() => {
    return concertList?.pages.flat() ?? []
  }, [concertList])

  const renderConcertListItem: ListRenderItem<(typeof concertListUIData)[number]> = useCallback(
    ({ item: value }) => {
      const onPress = () => {
        navigation.navigate('ConcertStackNavigation', {
          screen: 'ConcertDetailScreen',
          params: { concertId: value.id },
        })
      }
      return (
        <SearchItem
          type="concert"
          thumbnail={<SearchItemThumbnail type="square" uri={value.posters.at(0)?.imageUrl ?? ''} />}
          title={value.title}
          subtitle={format(new Date(value.date), 'EEE, MMM dd')}
          description={value.venues.at(0)?.venueTitle ?? ''}
          onPress={onPress}
        />
      )
    },
    [navigation],
  )

  return (
    <BottomSheetFlatList
      data={concertListUIData}
      bounces={false}
      focusHook={useFocusEffect}
      ListHeaderComponent={<Text weight="bold">현재 지역의 공연</Text>}
      contentContainerStyle={styles.contentContainer}
      keyExtractor={(item) => item.id}
      renderItem={renderConcertListItem}
      showsVerticalScrollIndicator={false}
    />
  )
}

const styles = StyleSheet.create({
  contentContainer: {
    flexGrow: 1,
    paddingVertical: 12,
    paddingBottom: 120,
    paddingHorizontal: 14,
    backgroundColor: colors.oc.gray[1].value,
  },
})
