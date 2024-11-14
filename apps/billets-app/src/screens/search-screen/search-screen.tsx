import { Text, TextInput } from '@coldsurfers/ocean-road/native'
import { useDebounce } from '@uidotdev/usehooks'
import format from 'date-fns/format'
import { useCallback, useMemo, useState } from 'react'
import {
  ActivityIndicator,
  FlatList,
  KeyboardAvoidingView,
  ListRenderItem,
  Platform,
  StyleSheet,
  View,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { match } from 'ts-pattern'
import { useShallow } from 'zustand/shallow'
import SearchItem from '../../features/search/ui/SearchItem'
import SearchItemTextThumbnail from '../../features/search/ui/SearchItemTextThumbnail'
import SearchItemThumbnail from '../../features/search/ui/SearchItemThumbnail'
import useConcertListQuery from '../../lib/hooks/queries/useConcertListQuery'
import useSearchQuery from '../../lib/hooks/queries/useSearchQuery'
import { useUserCurrentLocationStore } from '../../lib/stores/userCurrentLocationStore'
import CommonListEmpty from '../../ui/CommonListEmpty'
import { useSearchScreenNavigation } from './search-screen.hooks'

export const SearchScreen = () => {
  const navigation = useSearchScreenNavigation()
  const [searchKeyword, setSearchKeyword] = useState('')
  const debouncedSearchKeyword = useDebounce(searchKeyword, 350)
  const {
    data: searchData,
    isLoading: isLoadingSearch,
    isFetched: isFetchedSearch,
  } = useSearchQuery(
    { keyword: debouncedSearchKeyword },
    {
      enabled: !!debouncedSearchKeyword,
    },
  )

  const { latitude, longitude } = useUserCurrentLocationStore(
    useShallow((state) => ({
      latitude: state.latitude ? +`${state.latitude}`.substring(0, 7) : null,
      longitude: state.longitude ? +`${state.longitude}`.substring(0, 8) : null,
    })),
  )

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

  const searchListData = useMemo(() => {
    return searchData ?? []
  }, [searchData])

  const concertListData = useMemo(() => {
    return concertList?.pages.flat() ?? []
  }, [concertList])

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
      return match(item)
        .with({ type: 'artist' }, (value) => (
          <SearchItem
            type="artist"
            thumbnail={<SearchItemThumbnail uri={value.profileImgUrl} type="circle" />}
            title={value.name}
            subtitle="아티스트"
          />
        ))
        .with({ type: 'venue' }, (value) => (
          <SearchItem
            type="venue"
            thumbnail={<SearchItemTextThumbnail text={value.name.slice(0, 1)} />}
            title={value.name}
            subtitle="공연장"
          />
        ))
        .with({ type: 'concert' }, (value) => (
          <SearchItem
            type="concert"
            thumbnail={<SearchItemThumbnail type="square" uri={value.thumbnailImgUrl} />}
            title={value.title}
            subtitle={format(new Date(value.date), 'EEE, MMM dd')}
            description={value.venueTitle}
            onPress={() =>
              navigation.navigate('ConcertStackScreen', {
                screen: 'ConcertDetailScreen',
                params: { concertId: value.id },
              })
            }
          />
        ))
        .otherwise(() => null)
    },
    [navigation],
  )

  const renderConcertListItem: ListRenderItem<{
    artists: {
      name: string
      profileImageUrl: string
    }[]
    date: string
    id: string
    posters: {
      imageUrl: string
    }[]
    tickets: {
      formattedPrice: string
      openDate: string
      url: string
    }[]
    title: string
    venues: {
      venueTitle: string
    }[]
  }> = useCallback(
    ({ item: value }) => {
      return (
        <SearchItem
          type="concert"
          thumbnail={<SearchItemThumbnail type="square" uri={value.posters.at(0)?.imageUrl ?? ''} />}
          title={value.title}
          subtitle={format(new Date(value.date), 'EEE, MMM dd')}
          description={value.venues.at(0)?.venueTitle ?? ''}
          onPress={() =>
            navigation.navigate('ConcertStackScreen', {
              screen: 'ConcertDetailScreen',
              params: { concertId: value.id },
            })
          }
        />
      )
    },
    [navigation],
  )

  return (
    <SafeAreaView edges={['top']} style={styles.wrapper}>
      <TextInput
        value={searchKeyword}
        onChangeText={setSearchKeyword}
        autoCapitalize="none"
        placeholder={'검색할 단어 🔎'}
        clearButtonMode="while-editing"
      />
      {searchKeyword ? (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
          <FlatList
            data={searchListData}
            renderItem={renderSearchListItem}
            keyExtractor={(item) => `${item.type}-${item.id}`}
            style={styles.list}
            contentContainerStyle={styles.contentContainer}
            ListEmptyComponent={
              isLoadingSearch ? (
                <View style={styles.emptyWrapper}>
                  <ActivityIndicator size="large" />
                </View>
              ) : isFetchedSearch ? (
                <CommonListEmpty emptyText={`🥺\n앗,\n해당하는\n정보가 없어요!`} />
              ) : null
            }
          />
        </KeyboardAvoidingView>
      ) : (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
          <FlatList
            data={concertListData}
            ListHeaderComponent={<Text weight="bold">현재 지역의 공연</Text>}
            contentContainerStyle={styles.contentContainer}
            keyExtractor={(item) => item.id}
            renderItem={renderConcertListItem}
          />
        </KeyboardAvoidingView>
      )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  wrapper: { flex: 1, paddingHorizontal: 14 },
  list: { flex: 1 },
  contentContainer: {
    flexGrow: 1,
    paddingVertical: 12,
  },
  emptyWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
  },
  itemInnerRight: {
    marginLeft: 8,
  },
  emptyEmoji: { fontSize: 28 },
  emptyDesc: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 12,
  },
})
