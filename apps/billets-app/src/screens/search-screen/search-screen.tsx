import { useSearchStore } from '@/features/search/store'
import { SearchItem, SearchItemThumbnail } from '@/features/search/ui'
import { CommonListEmpty, CommonScreenLayout, NAVIGATION_HEADER_HEIGHT } from '@/ui'
import { colors } from '@coldsurfers/ocean-road'
import { Button, ProfileThumbnail, Text } from '@coldsurfers/ocean-road/native'
import BottomSheet, { BottomSheetFlatList, BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'
import { useFocusEffect } from '@react-navigation/native'
import { useDebounce } from '@uidotdev/usehooks'
import format from 'date-fns/format'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
  ActivityIndicator,
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
import { ConcertMapScreen } from '../concert-map-screen'
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
  const bottomSheetRef = useRef<BottomSheet>(null)
  const snapPoints = useMemo(() => ['10%', '50%', '100%'], [])
  const { keyword: searchKeyword } = useSearchStore(
    useShallow((state) => ({
      keyword: state.keyword,
    })),
  )

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

  const handleComponent = useMemo(() => null, [])
  const onPressMapFloatingBtn = useCallback(() => bottomSheetRef.current?.snapToIndex(0), [])

  return (
    <BottomSheetModalProvider>
      <KeyboardAvoidWrapper>
        <CommonScreenLayout style={styles.wrapper}>
          <ConcertMapScreen />
          <BottomSheet
            ref={bottomSheetRef}
            index={2}
            snapPoints={snapPoints}
            enablePanDownToClose={false}
            handleComponent={handleComponent}
            animateOnMount={false}
          >
            {searchKeyword ? (
              <BottomSheetFlatList
                data={searchListData}
                focusHook={useFocusEffect}
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
            ) : (
              <BottomSheetFlatList
                data={concertListData}
                focusHook={useFocusEffect}
                ListHeaderComponent={<Text weight="bold">현재 지역의 공연</Text>}
                contentContainerStyle={styles.contentContainer}
                keyExtractor={(item) => item.id}
                renderItem={renderConcertListItem}
                showsVerticalScrollIndicator={false}
              />
            )}
          </BottomSheet>
          <Button
            theme="border"
            style={[
              styles.floatingButton,
              {
                bottom: keyboardHeight > 0 ? keyboardHeight - bottomTabBarHeight : 12,
              },
            ]}
            onPress={onPressMapFloatingBtn}
          >
            맵으로 보기
          </Button>
        </CommonScreenLayout>
      </KeyboardAvoidWrapper>
    </BottomSheetModalProvider>
  )
}

const styles = StyleSheet.create({
  wrapper: { flex: 1 },
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
