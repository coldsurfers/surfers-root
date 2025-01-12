import { useKeyboard } from '@/lib'
import { apiClient } from '@/lib/api/openapi-client'
import { useSearchScreenNavigation } from '@/screens/search-screen/search-screen.hooks'
import { Text, useColorScheme } from '@coldsurfers/ocean-road/native'
import { BottomSheetFlatList } from '@gorhom/bottom-sheet'
import { useFocusEffect } from '@react-navigation/native'
import { useQuery } from '@tanstack/react-query'
import format from 'date-fns/format'
import { useCallback, useMemo } from 'react'
import { ListRenderItem, StyleSheet } from 'react-native'
import { SearchItem } from '../search-item'
import { SearchItemThumbnail } from '../search-item-thumbnail'

const FetchSearchConcertItem = ({
  title,
  subtitle,
  onPress,
  concertId,
}: {
  title: string
  subtitle: string
  onPress: () => void
  concertId: string
}) => {
  const { data: posters } = useQuery({
    queryKey: apiClient.queryKeys.poster.listByConcertId(concertId),
    queryFn: () => apiClient.poster.getPostersByConcertId(concertId),
  })
  const { data: venues } = useQuery({
    queryKey: apiClient.queryKeys.venue.listByConcertId(concertId),
    queryFn: () => apiClient.venue.getVenuesByConcertId(concertId),
  })
  return (
    <SearchItem
      type="concert"
      thumbnail={<SearchItemThumbnail type="square" uri={posters?.at(0)?.url ?? ''} />}
      title={title}
      subtitle={subtitle}
      description={venues?.at(0)?.name ?? ''}
      onPress={onPress}
    />
  )
}

export const SearchDefaultBottomResultList = ({ latitude, longitude }: { latitude: number; longitude: number }) => {
  const { semantics } = useColorScheme()
  const { bottomPadding } = useKeyboard()
  const navigation = useSearchScreenNavigation()
  const { data: concertList } = useQuery({
    queryKey: apiClient.queryKeys.concert.listByLocation({ latitude, longitude }),
    queryFn: () => apiClient.concert.getConcerts({ latitude, longitude }),
    refetchOnWindowFocus: false,
  })
  const concertListUIData = useMemo(() => {
    return concertList ?? []
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
        <FetchSearchConcertItem
          title={value.title}
          subtitle={format(value.date ? new Date(value.date) : new Date(), 'EEE, MMM dd')}
          onPress={onPress}
          concertId={value.id}
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
      ListHeaderComponent={
        <Text weight="bold" style={[styles.listHeaderText, { color: semantics.foreground[1] }]}>
          현재 지역의 공연
        </Text>
      }
      contentContainerStyle={[
        styles.contentContainer,
        { paddingBottom: bottomPadding, backgroundColor: semantics.background[4] },
      ]}
      keyExtractor={(item) => item.id}
      renderItem={renderConcertListItem}
      showsVerticalScrollIndicator={false}
    />
  )
}

const styles = StyleSheet.create({
  contentContainer: {
    flexGrow: 1,
    paddingTop: 12,
    paddingHorizontal: 14,
    // backgroundColor: colors.oc.gray[1].value,
  },
  listHeaderText: {
    fontSize: 14,
  },
})
