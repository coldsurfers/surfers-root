import { $api } from '@/lib/api/openapi-client'
import { useSearchScreenNavigation } from '@/screens/search-screen/search-screen.hooks'
import { CommonListEmpty } from '@/ui/common-list-empty'
import { colors } from '@coldsurfers/ocean-road'
import { ProfileThumbnail } from '@coldsurfers/ocean-road/native'
import { BottomSheetFlatList } from '@gorhom/bottom-sheet'
import { useFocusEffect } from '@react-navigation/native'
import format from 'date-fns/format'
import { useCallback, useMemo } from 'react'
import { ActivityIndicator, ListRenderItem, StyleSheet, View } from 'react-native'
import { match } from 'ts-pattern'
import { SearchItem } from '../search-item'
import { SearchItemThumbnail } from '../search-item-thumbnail'

const ListEmptyComponent = ({
  isLoadingSearch,
  isFetchedSearch,
}: {
  isLoadingSearch: boolean
  isFetchedSearch: boolean
}) => {
  return isLoadingSearch ? (
    <View style={styles.emptyWrapper}>
      <ActivityIndicator size="large" />
    </View>
  ) : isFetchedSearch ? (
    <CommonListEmpty emptyText={`🥺\n앗,\n해당하는\n정보가 없어요!`} />
  ) : null
}

export const SearchBottomKeywordResultList = ({ keyword }: { keyword: string }) => {
  const navigation = useSearchScreenNavigation()
  const {
    data: searchData,
    isLoading: isLoadingSearch,
    isFetched: isFetchedSearch,
  } = $api.useQuery(
    'get',
    '/v1/search/',
    {
      params: {
        query: {
          keyword,
        },
      },
    },
    {
      enabled: !!keyword,
    },
  )

  const searchResultUIData = useMemo(() => {
    return searchData ?? []
  }, [searchData])

  const renderSearchListItem: ListRenderItem<
    | {
        id: string
        name: string
        profileImgUrl: string
        type: 'artist'
      }
    | {
        id: string
        name: string
        type: 'venue'
      }
    | {
        date: string
        id: string
        thumbnailImgUrl: string
        title: string
        type: 'concert'
        venueTitle: string
      }
  > = useCallback(
    ({ item }) => {
      const onPressVenueItem = () => {
        navigation.navigate('VenueStackNavigation', {
          screen: 'VenueDetailScreen',
          params: {
            id: item.id,
          },
        })
      }
      const onPressArtistItem = () => {
        navigation.navigate('ArtistStackNavigation', {
          screen: 'ArtistDetailScreen',
          params: {
            artistId: item.id,
          },
        })
      }
      const onPressConcertItem = () =>
        navigation.navigate('ConcertStackNavigation', {
          screen: 'ConcertDetailScreen',
          params: { concertId: item.id },
        })
      return match(item)
        .with({ type: 'artist' }, (value) => (
          <SearchItem
            type="artist"
            thumbnail={<SearchItemThumbnail type="circle" emptyBgText={value.name.at(0)} uri={value.profileImgUrl} />}
            title={value.name}
            subtitle="아티스트"
            onPress={onPressArtistItem}
          />
        ))
        .with({ type: 'venue' }, (value) => (
          <SearchItem
            type="venue"
            thumbnail={<SearchItemThumbnail type="circle" emptyBgText={value.name.at(0)} uri={''} />}
            title={value.name}
            subtitle="공연장"
            onPress={onPressVenueItem}
          />
        ))
        .with({ type: 'concert' }, (value) => (
          <SearchItem
            type="concert"
            thumbnail={
              <ProfileThumbnail
                type={'square'}
                emptyBgText={value.title.at(0) ?? ''}
                imageUrl={value.thumbnailImgUrl ?? ''}
                size="md"
              />
            }
            title={value.title}
            subtitle={format(new Date(value.date), 'EEE, MMM dd')}
            description={value.venueTitle}
            onPress={onPressConcertItem}
          />
        ))
        .otherwise(() => null)
    },
    [navigation],
  )

  return (
    <BottomSheetFlatList
      data={searchResultUIData}
      bounces={false}
      focusHook={useFocusEffect}
      renderItem={renderSearchListItem}
      keyExtractor={(item) => `${item.type}-${item.id}`}
      style={styles.list}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
      ListEmptyComponent={<ListEmptyComponent isLoadingSearch={isLoadingSearch} isFetchedSearch={isFetchedSearch} />}
    />
  )
}

const styles = StyleSheet.create({
  list: { flex: 1 },
  contentContainer: {
    flexGrow: 1,
    paddingVertical: 12,
    paddingBottom: 120,
    paddingHorizontal: 14,
    backgroundColor: colors.oc.gray[1].value,
  },
  emptyWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
