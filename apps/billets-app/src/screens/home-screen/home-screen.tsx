import {
  CurrentLocationTracker,
  LocationSelector,
  LocationSelectorModal,
  useToggleSubscribeConcert,
  useUserCurrentLocationStore,
} from '@/features'
import { ConcertListItemT } from '@/features/concert/ui/concert-list/concert-list.types'
import { useShowBottomTabBar } from '@/lib'
import { AnimatePresence, CommonScreenLayout } from '@/ui'
import { useScrollToTop } from '@react-navigation/native'
import { Suspense, useCallback, useRef, useState } from 'react'
import { FlatList } from 'react-native'
import { useShallow } from 'zustand/shallow'
import { ConcertList, ConcertListSkeleton } from '../../features/concert'
import useGetMeQuery from '../../lib/react-query/queries/useGetMeQuery'
import { useHomeScreenNavigation } from './home-screen.hooks'

const SuspenseHomeScreen = () => {
  const navigation = useHomeScreenNavigation()
  const listRef = useRef<FlatList>(null)
  useScrollToTop(listRef)
  useShowBottomTabBar()

  const [locationModalVisible, setLocationModalVisible] = useState(false)
  const { latitude, longitude } = useUserCurrentLocationStore(
    useShallow((state) => ({
      latitude: state.latitude ? +`${state.latitude}`.substring(0, 7) : null,
      longitude: state.longitude ? +`${state.longitude}`.substring(0, 8) : null,
    })),
  )

  const { data: meData } = useGetMeQuery()

  const toggleSubscribeConcert = useToggleSubscribeConcert()

  const onPressConcertListItem = useCallback(
    (item: ConcertListItemT) => {
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
      item: ConcertListItemT,
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
    <CommonScreenLayout edges={['top']}>
      {latitude === null && longitude === null && <CurrentLocationTracker />}
      <LocationSelector onPress={showLocationModal} />
      {latitude !== null && longitude !== null && (
        <Suspense fallback={<ConcertListSkeleton />}>
          <ConcertList
            ref={listRef}
            onPressItem={onPressConcertListItem}
            onPressSubscribe={onPressSubscribe}
            latitude={latitude}
            longitude={longitude}
          />
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
