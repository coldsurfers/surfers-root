import { CurrentLocationTracker, useToggleSubscribeConcert, useUserCurrentLocationStore } from '@/features'
import { useShowBottomTabBar } from '@/lib'
import { apiClient } from '@/lib/api/openapi-client'
import {
  AnimatePresence,
  CommonScreenLayout,
  ConcertList,
  ConcertListSkeleton,
  LocationSelector,
  LocationSelectorModal,
} from '@/ui'
import { ConcertListItemType } from '@/ui/concert-list/concert-list.types'
import { useScrollToTop } from '@react-navigation/native'
import { useQuery } from '@tanstack/react-query'
import { Suspense, useCallback, useRef, useState } from 'react'
import { FlatList } from 'react-native'
import { useShallow } from 'zustand/shallow'
import { useHomeScreenNavigation } from './home-screen.hooks'

const SuspenseHomeScreen = () => {
  const navigation = useHomeScreenNavigation()
  const listRef = useRef<FlatList>(null)
  useScrollToTop(listRef)
  useShowBottomTabBar()

  const [locationModalVisible, setLocationModalVisible] = useState(false)
  const {
    latitude,
    longitude,
    cityName,
    type: userCurrentLocationType,
  } = useUserCurrentLocationStore(
    useShallow((state) => ({
      latitude: state.latitude ? +`${state.latitude}`.substring(0, 7) : null,
      longitude: state.longitude ? +`${state.longitude}`.substring(0, 8) : null,
      cityName: state.cityName,
      type: state.type,
    })),
  )

  const { data: meData } = useQuery({
    queryKey: apiClient.user.queryKeys.me,
    queryFn: () => apiClient.user.getMe(),
  })

  const toggleSubscribeConcert = useToggleSubscribeConcert()

  const onPressConcertListItem = useCallback(
    (item: ConcertListItemType) => {
      navigation.navigate('ConcertStackNavigation', {
        screen: 'ConcertDetailScreen',
        params: { concertId: item.id },
      })
    },
    [navigation],
  )

  const onPressSubscribeConcertListItem = useCallback(
    ({ isSubscribed, concertId }: { isSubscribed: boolean; concertId: string }) => {
      if (!meData) {
        navigation.navigate('LoginStackNavigation', {
          screen: 'LoginSelectionScreen',
          params: {},
        })
        return
      }

      toggleSubscribeConcert({
        isSubscribed,
        concertId,
      })
    },
    [meData, navigation, toggleSubscribeConcert],
  )

  const onPressSubscribe = useCallback(
    (
      item: ConcertListItemType,
      options: {
        isSubscribed: boolean
      },
    ) =>
      onPressSubscribeConcertListItem({
        isSubscribed: options.isSubscribed,
        concertId: item.id,
      }),
    [onPressSubscribeConcertListItem],
  )

  const showLocationModal = useCallback(() => {
    setLocationModalVisible(true)
  }, [])

  return (
    <CommonScreenLayout edges={['top', 'bottom']}>
      {latitude === null && longitude === null && <CurrentLocationTracker />}
      <LocationSelector type={userCurrentLocationType} cityName={cityName} onPress={showLocationModal} />
      {latitude !== null && longitude !== null && (
        <Suspense fallback={<ConcertListSkeleton />}>
          <ConcertList ref={listRef} onPressItem={onPressConcertListItem} onPressSubscribe={onPressSubscribe} />
        </Suspense>
      )}
      <AnimatePresence>
        {locationModalVisible && (
          <LocationSelectorModal
            visible={locationModalVisible}
            onPressBackground={() => setLocationModalVisible(false)}
          />
        )}
      </AnimatePresence>
    </CommonScreenLayout>
  )
}

export const HomeScreen = () => {
  return (
    <Suspense fallback={<ConcertListSkeleton />}>
      <SuspenseHomeScreen />
    </Suspense>
  )
}
