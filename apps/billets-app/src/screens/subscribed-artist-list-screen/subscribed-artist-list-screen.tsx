import { CommonScreenLayout } from '@/ui'
import { SubscribedArtistList } from '@/ui/subscribed-artist-list'
import { Spinner } from '@coldsurfers/ocean-road/native'
import { Suspense } from 'react'

export const SubscribedArtistListScreen = () => (
  <CommonScreenLayout withBottomTab={false}>
    <Suspense fallback={<Spinner positionCenter />}>
      <SubscribedArtistList />
    </Suspense>
  </CommonScreenLayout>
)
