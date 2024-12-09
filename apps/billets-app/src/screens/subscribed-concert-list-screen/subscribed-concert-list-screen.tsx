import { SubscribedConcertList } from '@/features'
import { CommonScreenLayout } from '@/ui'
import { useCallback } from 'react'
import { useSubscribedConcertListScreenNavigation } from './subscribed-concert-list-screen.hooks'

export const SubscribedConcertListScreen = () => {
  const navigation = useSubscribedConcertListScreenNavigation()
  const onPressItem = useCallback(
    (concertId: string) => {
      navigation.navigate('ConcertStackScreen', {
        screen: 'ConcertDetailScreen',
        params: {
          concertId,
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
