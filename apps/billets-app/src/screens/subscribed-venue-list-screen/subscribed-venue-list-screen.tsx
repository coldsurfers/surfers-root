import { CommonScreenLayout } from '@/ui'
import { SubscribedVenueList } from '@/ui/subscribed-venue-list'
import { Spinner } from '@coldsurfers/ocean-road/native'
import { Suspense } from 'react'

export const SubscribedVenueListScreen = () => (
  <CommonScreenLayout withBottomTab={false}>
    <Suspense fallback={<Spinner positionCenter />}>
      <SubscribedVenueList />
    </Suspense>
  </CommonScreenLayout>
)
