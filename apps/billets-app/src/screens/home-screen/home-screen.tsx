import { CurrentLocationTracker, useUserCurrentLocationStore } from '@/features'
import { useToggleSubscribeConcert } from '@/features/subscribe/hooks/useToggleSubscribeConcert'
import { useFirebaseAnalytics, useShowBottomTabBar, zodScreen } from '@/lib'
import { apiClient } from '@/lib/api/openapi-client'
import { CommonScreenLayout, ConcertList, ConcertListSkeleton, LocationSelector, LocationSelectorModal } from '@/ui'
import { ConcertListItemType } from '@/ui/concert-list/concert-list.types'
import { useScrollToTop } from '@react-navigation/native'
import { PerformanceMeasureView, RenderStateProps, useStartProfiler } from '@shopify/react-native-performance'
import { useQuery } from '@tanstack/react-query'
import { Suspense, useCallback, useRef, useState } from 'react'
import { FlatList, View } from 'react-native'
import { useShallow } from 'zustand/shallow'
import { useHomeScreenNavigation } from './home-screen.hooks'

const SuspenseHomeScreen = () => {
  const startNavigationTTITimer = useStartProfiler()
  const navigation = useHomeScreenNavigation()
  const { logEvent } = useFirebaseAnalytics()
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
      startNavigationTTITimer({
        source: zodScreen.HomeScreen.name,
        uiEvent: undefined,
      })
      navigation.navigate('EventStackNavigation', {
        screen: 'EventDetailScreen',
        params: { eventId: item.id },
      })
      logEvent({
        name: 'click_event',
        params: {
          event_id: item.id,
        },
      })
    },
    [logEvent, navigation, startNavigationTTITimer],
  )

  const onPressSubscribeConcertListItem = useCallback(
    ({ isSubscribed, eventId }: { isSubscribed: boolean; eventId: string }) => {
      if (!meData) {
        navigation.navigate('LoginStackNavigation', {
          screen: 'LoginSelectionScreen',
          params: {},
        })
        return
      }

      toggleSubscribeConcert({
        isSubscribed,
        eventId,
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
        eventId: item.id,
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
      {locationModalVisible && (
        <LocationSelectorModal
          visible={locationModalVisible}
          onPressBackground={() => setLocationModalVisible(false)}
        />
      )}
    </CommonScreenLayout>
  )
}

export const HomeScreen = () => {
  const renderStateProps: RenderStateProps = {
    interactive: false,
    renderPassName: 'home_screen_render',
  }
  return (
    <PerformanceMeasureView
      interactive={false}
      screenName={zodScreen.HomeScreen.name}
      {...renderStateProps}
      optimizeForSlowRenderComponents
      slowRenderPlaceholder={<View style={{ backgroundColor: 'red', flex: 1 }} />}
    >
      <Suspense fallback={<ConcertListSkeleton />}>
        <SuspenseHomeScreen />
      </Suspense>
    </PerformanceMeasureView>
  )
}
