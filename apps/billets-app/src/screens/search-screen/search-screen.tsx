import { SearchItem, SearchItemThumbnail } from '@/features/search/ui'
import { CommonListEmpty, CommonScreenLayout, NAVIGATION_HEADER_HEIGHT } from '@/ui'
import { Button, ProfileThumbnail, Text, TextInput } from '@coldsurfers/ocean-road/native'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'
import { useDebounce } from '@uidotdev/usehooks'
import format from 'date-fns/format'
import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  ActivityIndicator,
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  KeyboardAvoidingViewProps,
  ListRenderItem,
  Platform,
  StyleSheet,
  View,
} from 'react-native'
import { match } from 'ts-pattern'
import { useShallow } from 'zustand/shallow'
import useConcertListQuery from '../../lib/react-query/queries/useConcertListQuery'
import useSearchQuery from '../../lib/react-query/queries/useSearchQuery'
import { useUserCurrentLocationStore } from '../../lib/stores/userCurrentLocationStore'
import { useSearchScreenNavigation } from './search-screen.hooks'

const KeyboardAvoidWrapper = (props: KeyboardAvoidingViewProps) => {
  return (
    <KeyboardAvoidingView
      {...props}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={NAVIGATION_HEADER_HEIGHT}
      style={{ flex: 1 }}
    />
  )
}

export const SearchScreen = () => {
  const navigation = useSearchScreenNavigation()
  const bottomTabBarHeight = useBottomTabBarHeight()
  const [searchKeyword, setSearchKeyword] = useState('')
  const [keyboardHeight, setKeyboardHeight] = useState(0)
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

  const renderConcertListItem: ListRenderItem<(typeof concertListData)[number]> = useCallback(
    ({ item: value }) => {
      return (
        <SearchItem
          type="concert"
          thumbnail={<SearchItemThumbnail type="square" uri={value.posters.at(0)?.imageUrl ?? ''} />}
          title={value.title}
          subtitle={format(new Date(value.date), 'EEE, MMM dd')}
          description={value.venues.at(0)?.venueTitle ?? ''}
          onPress={() =>
            navigation.navigate('ConcertStackNavigation', {
              screen: 'ConcertDetailScreen',
              params: { concertId: value.id },
            })
          }
        />
      )
    },
    [navigation],
  )

  useEffect(() => {
    const keyboardWillShowEmitterSubscription = Keyboard.addListener('keyboardWillShow', (e) => {
      setKeyboardHeight(e.endCoordinates.height)
    })
    const keyboardWillHideEmitterSubscription = Keyboard.addListener('keyboardWillHide', () => {
      setKeyboardHeight(0)
    })

    return () => {
      keyboardWillShowEmitterSubscription.remove()
      keyboardWillHideEmitterSubscription.remove()
    }
  }, [])

  return (
    <CommonScreenLayout style={styles.wrapper}>
      <View style={styles.topInputWrapper}>
        <TextInput
          value={searchKeyword}
          onChangeText={setSearchKeyword}
          autoCapitalize="none"
          placeholder={'🔎 어떤 공연을 찾고 싶으세요?'}
          clearButtonMode="while-editing"
        />
      </View>
      {searchKeyword ? (
        <KeyboardAvoidWrapper>
          <FlatList
            data={searchListData}
            renderItem={renderSearchListItem}
            keyExtractor={(item) => `${item.type}-${item.id}`}
            style={styles.list}
            contentContainerStyle={styles.contentContainer}
            showsVerticalScrollIndicator={false}
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
        </KeyboardAvoidWrapper>
      ) : (
        <KeyboardAvoidWrapper>
          <FlatList
            data={concertListData}
            ListHeaderComponent={<Text weight="bold">현재 지역의 공연</Text>}
            contentContainerStyle={styles.contentContainer}
            keyExtractor={(item) => item.id}
            renderItem={renderConcertListItem}
            showsVerticalScrollIndicator={false}
          />
          <Button
            theme="border"
            style={[
              styles.floatingButton,
              {
                bottom: keyboardHeight > 0 ? keyboardHeight - bottomTabBarHeight : 12,
              },
            ]}
            onPress={() => {
              navigation.navigate('ConcertMapScreen', {})
            }}
          >
            맵으로 보기
          </Button>
        </KeyboardAvoidWrapper>
      )}
    </CommonScreenLayout>
  )
}

const styles = StyleSheet.create({
  wrapper: { flex: 1, paddingHorizontal: 14 },
  list: { flex: 1 },
  contentContainer: {
    flexGrow: 1,
    paddingVertical: 12,
    paddingBottom: 120,
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
  topInputWrapper: {
    paddingTop: 8,
    paddingBottom: 8,
  },
  floatingButton: { width: 120, alignSelf: 'center', position: 'absolute', right: 0 },
})
