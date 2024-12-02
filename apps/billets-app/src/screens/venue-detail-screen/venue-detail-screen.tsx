import { useVenueDetailQuery } from '@/lib/react-query'
import { useVenueConcertListQuery } from '@/lib/react-query/queries/use-venue-concert-list-query'
import { CommonScreenLayout } from '@/ui'
import { useMemo } from 'react'
import { useVenueDetailScreenRoute } from './venue-detail-screen.hooks'

export const VenueDetailScreen = () => {
  const route = useVenueDetailScreenRoute()
  const { data: venueDetail, isLoading: isLoadingVenueDetail } = useVenueDetailQuery({
    id: route.params.id,
  })
  const {
    data: venueConcertList,
    isPending: isPendingVenueConcertList,
    isFetchingNextPage: isFetchingNextPageVenueConcerList,
    hasNextPage: hasNextPageVenueConcertList,
  } = useVenueConcertListQuery({
    venueId: route.params.id,
  })

  const venueDetailUIData = useMemo(() => {
    return venueDetail?.data ?? null
  }, [venueDetail?.data])
  const venueConcertListUIData = useMemo(() => {
    return venueConcertList?.pages.flat() ?? []
  }, [venueConcertList?.pages])

  return <CommonScreenLayout></CommonScreenLayout>
}
