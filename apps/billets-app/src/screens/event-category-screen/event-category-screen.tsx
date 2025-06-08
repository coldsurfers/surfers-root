import { withHapticPress } from '@/lib'
import { CommonScreenLayout, ConcertList } from '@/ui'
import { Spinner } from '@coldsurfers/ocean-road/native'
import { Suspense, useCallback } from 'react'
import { useEventCategoryScreenNavigation, useEventCategoryScreenRoute } from './event-category-screen.hooks'

export const EventCategoryScreen = () => {
  const route = useEventCategoryScreenRoute()
  const navigation = useEventCategoryScreenNavigation()
  const onPressItem = useCallback(
    (eventId: string) => {
      navigation.navigate('EventDetailScreen', {
        eventId,
      })
    },
    [navigation],
  )
  return (
    <CommonScreenLayout withBottomTab={false}>
      <Suspense fallback={<Spinner positionCenter />}>
        <ConcertList
          hideTopMenu
          eventCategory={route.params.eventCategory}
          onPressItem={withHapticPress((item) => onPressItem(item.id), 'impactMedium')}
        />
      </Suspense>
    </CommonScreenLayout>
  )
}
