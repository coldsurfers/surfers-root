import { useSearchStore } from '@/features/search/store'
import { SearchBottomKeywordResultList, SearchItem, SearchItemThumbnail } from '@/features/search/ui'
import { CommonScreenLayout, NAVIGATION_HEADER_HEIGHT } from '@/ui'
import { colors } from '@coldsurfers/ocean-road'
import { Button, Text } from '@coldsurfers/ocean-road/native'
import BottomSheet, { BottomSheetFlatList, BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'
import { useFocusEffect } from '@react-navigation/native'
import { useDebounce } from '@uidotdev/usehooks'
import format from 'date-fns/format'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
  Keyboard,
  KeyboardAvoidingView,
  KeyboardAvoidingViewProps,
  ListRenderItem,
  Platform,
  StyleSheet,
} from 'react-native'
import { useShallow } from 'zustand/shallow'
import useConcertListQuery from '../../lib/react-query/queries/useConcertListQuery'
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

  const concertListData = useMemo(() => {
    return concertList?.pages.flat() ?? []
  }, [concertList])

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
            {debouncedSearchKeyword ? (
              <SearchBottomKeywordResultList keyword={debouncedSearchKeyword} />
            ) : (
              <BottomSheetFlatList
                data={concertListData}
                bounces={false}
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
