import { CommonScreenLayout, SubscribedConcertList } from '@/ui'
import { Spinner } from '@coldsurfers/ocean-road/native'
import { Suspense, useCallback } from 'react'
import { useSubscribedConcertListScreenNavigation } from './subscribed-concert-list-screen.hooks'

const ScreenContent = () => {
  const navigation = useSubscribedConcertListScreenNavigation()
  const onPressItem = useCallback(
    (eventId: string) => {
      navigation.navigate('EventStackNavigation', {
        screen: 'EventDetailScreen',
        params: {
          eventId,
        },
      })
    },
    [navigation],
  )
  return (
    <CommonScreenLayout>
      <SubscribedConcertList horizontal={false} onPressItem={onPressItem} />
    </CommonScreenLayout>
  )
}

export const SubscribedConcertListScreen = () => {
  return (
    <Suspense
      fallback={
        <CommonScreenLayout>
          <Spinner positionCenter />
        </CommonScreenLayout>
      }
    >
      <ScreenContent />
    </Suspense>
  )
}
