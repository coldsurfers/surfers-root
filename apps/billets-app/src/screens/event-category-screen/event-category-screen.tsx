import { withHapticPress } from '@/lib'
import { zodScreen } from '@/lib/navigations'
import { CommonScreenLayout, ConcertList } from '@/ui'
import { Spinner } from '@coldsurfers/ocean-road/native'
import { PerformanceMeasureView, useStartProfiler } from '@shopify/react-native-performance'
import { Suspense, useCallback } from 'react'
import { useEventCategoryScreenNavigation, useEventCategoryScreenRoute } from './event-category-screen.hooks'

export const EventCategoryScreen = () => {
  const startNavigationTTITimer = useStartProfiler()
  const route = useEventCategoryScreenRoute()
  const navigation = useEventCategoryScreenNavigation()
  const onPressItem = useCallback(
    (eventId: string) => {
      startNavigationTTITimer({
        source: zodScreen.EventCategoryScreen.name,
        uiEvent: undefined,
      })
      navigation.navigate('EventDetailScreen', {
        eventId,
      })
    },
    [navigation, startNavigationTTITimer],
  )
  return (
    <PerformanceMeasureView interactive={false} screenName={zodScreen.EventCategoryScreen.name}>
      <CommonScreenLayout withBottomTab={false}>
        <Suspense fallback={<Spinner positionCenter />}>
          <ConcertList
            hideTopMenu
            eventCategory={route.params.eventCategory}
            onPressItem={withHapticPress((item) => onPressItem(item.id), 'impactMedium')}
          />
        </Suspense>
      </CommonScreenLayout>
    </PerformanceMeasureView>
  )
}
