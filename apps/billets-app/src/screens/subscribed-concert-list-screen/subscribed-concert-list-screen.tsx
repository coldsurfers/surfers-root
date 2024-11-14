import { SubscribedConcertList } from '@/features'
import { CommonScreenLayout } from '@/ui'

export const SubscribedConcertListScreen = () => {
  return (
    <CommonScreenLayout>
      <SubscribedConcertList onPressItem={() => {}} />
    </CommonScreenLayout>
  )
}
