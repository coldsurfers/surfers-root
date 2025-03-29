import { ConcertDetailSectionList, ConcertDetailVenueMapBottomSheet } from '@/features/concert-detail'
import { TicketListBottomSheet } from '@/features/concert-detail/components/ticket-list-bottom-sheet/ticket-list-bottom-sheet'
import { useToggleSubscribeConcert } from '@/features/subscribe/hooks/useToggleSubscribeConcert'
import { useEffectOnce, useFirebaseAnalytics, useStoreReview, zodScreen } from '@/lib'
import { apiClient } from '@/lib/api/openapi-client'
import commonStyles from '@/lib/common-styles'
import { concertDetailCountForStoreReviewStorage } from '@/lib/storage'
import { NAVIGATION_HEADER_HEIGHT } from '@/ui'
import { colors } from '@coldsurfers/ocean-road'
import { Spinner, useColorScheme } from '@coldsurfers/ocean-road/native'
import { BottomSheetModal } from '@gorhom/bottom-sheet'
import { PerformanceMeasureView } from '@shopify/react-native-performance'
import { useQuery } from '@tanstack/react-query'
import React, { PropsWithChildren, Suspense, useCallback, useRef } from 'react'
import { Dimensions, Platform, StatusBar, StyleSheet, View } from 'react-native'
import { useEventDetailScreenNavigation, useEventDetailScreenRoute } from './event-detail-screen.hooks'

const EventDetailScreenLayout = ({ children }: PropsWithChildren) => {
  const { semantics } = useColorScheme()
  return (
    <View style={{ flex: 1, marginTop: -NAVIGATION_HEADER_HEIGHT, backgroundColor: semantics.background[3] }}>
      {children}
    </View>
  )
}

const ScreenInner = () => {
  const { semantics } = useColorScheme()
  const { logEvent } = useFirebaseAnalytics()
  const navigation = useEventDetailScreenNavigation()
  const { params } = useEventDetailScreenRoute()
  const { requestReview } = useStoreReview()
  const ticketSheetRef = useRef<BottomSheetModal>(null)

  const { data: subscribedConcert } = useQuery({
    queryKey: apiClient.subscribe.queryKeys.eventSubscribe({ eventId: params.eventId }),
    queryFn: () => apiClient.subscribe.getEvent({ eventId: params.eventId }),
  })
  const { data: meData } = useQuery({
    queryKey: apiClient.user.queryKeys.me,
    queryFn: () => apiClient.user.getMe(),
  })
  const toggleSubscribeConcert = useToggleSubscribeConcert()

  const mapDetailBottomSheetModalRef = useRef<BottomSheetModal>(null)

  const onPressSubscribe = useCallback(() => {
    if (!meData) {
      // show login modal
      navigation.navigate('LoginStackNavigation', {
        screen: 'LoginSelectionScreen',
        params: {},
      })
      return
    }
    toggleSubscribeConcert({
      isSubscribed: !!subscribedConcert,
      eventId: params.eventId,
    })
  }, [meData, navigation, params.eventId, subscribedConcert, toggleSubscribeConcert])

  useEffectOnce(() => {
    const existingCount = concertDetailCountForStoreReviewStorage.get() ?? 0
    concertDetailCountForStoreReviewStorage.set(existingCount + 1)

    return () => {
      const count = concertDetailCountForStoreReviewStorage.get()
      if (!count) {
        return
      }
      if (count % 10 === 0) {
        requestReview()
      }
    }
  })

  useEffectOnce(() => {
    logEvent({
      name: 'visit_event_detail',
      params: {
        event_id: params.eventId,
      },
    })
  })

  return (
    <EventDetailScreenLayout>
      <StatusBar hidden={Platform.OS === 'ios'} />
      <View style={[styles.wrapper, { backgroundColor: semantics.background[3] }]}>
        <Suspense fallback={<Spinner />}>
          <ConcertDetailSectionList
            id={params.eventId}
            onPressTicketCta={() => ticketSheetRef.current?.present()}
            onPressArtist={(artistId) =>
              navigation.navigate('ArtistStackNavigation', {
                screen: 'ArtistDetailScreen',
                params: {
                  artistId,
                },
              })
            }
            onPressVenueMap={() => mapDetailBottomSheetModalRef.current?.present()}
            onPressVenueProfile={(venueId) => {
              navigation.navigate('VenueStackNavigation', {
                screen: 'VenueDetailScreen',
                params: {
                  id: venueId,
                },
              })
            }}
            isSubscribed={!!subscribedConcert}
            onPressSubscribe={onPressSubscribe}
          />
        </Suspense>
      </View>
      <ConcertDetailVenueMapBottomSheet ref={mapDetailBottomSheetModalRef} eventId={params.eventId} />
      <TicketListBottomSheet
        ref={ticketSheetRef}
        eventId={params.eventId}
        onPressBackdrop={() => ticketSheetRef.current?.close()}
      />
    </EventDetailScreenLayout>
  )
}

export const EventDetailScreen = () => {
  return (
    <PerformanceMeasureView interactive={false} screenName={zodScreen.EventDetailScreen.name}>
      <Suspense
        fallback={
          <EventDetailScreenLayout>
            <Spinner positionCenter />
          </EventDetailScreenLayout>
        }
      >
        <ScreenInner />
      </Suspense>
    </PerformanceMeasureView>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: colors.oc.gray[1].value,
  },
  fixedBottom: {
    backgroundColor: colors.oc.white.value,
    paddingTop: 14,
    paddingBottom: 14,
    paddingHorizontal: 14,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    ...commonStyles.shadowBox,
  },
  imageViewerCloseButton: { position: 'absolute', zIndex: 99, right: 12 },
  imageViewerCloseText: { color: colors.oc.white.value },
  venueMap: {
    width: Dimensions.get('screen').width - 12 * 2,
    height: 350,
    marginLeft: 'auto',
    marginRight: 'auto',
    borderRadius: 8,
    marginTop: 4,
  },
  ticketBtn: {
    backgroundColor: colors.oc.cyan[8].value,
  },
})
