import {
  ConcertDetailSectionList,
  ConcertDetailSectionListSections,
  ConcertDetailVenueMapBottomSheet,
} from '@/features/concert-detail'
import { useToggleSubscribeConcert } from '@/features/subscribe'
import { useEffectOnce, useStoreReview, zodScreen } from '@/lib'
import { apiClient } from '@/lib/api/openapi-client'
import commonStyles from '@/lib/common-styles'
import { concertDetailCountForStoreReviewStorage } from '@/lib/storage'
import { NAVIGATION_HEADER_HEIGHT } from '@/ui'
import { TicketListBottomSheet } from '@/ui/ticket-list-bottom-sheet/ticket-list-bottom-sheet'
import { colors } from '@coldsurfers/ocean-road'
import { Spinner, useColorScheme } from '@coldsurfers/ocean-road/native'
import { BottomSheetModal } from '@gorhom/bottom-sheet'
import { PerformanceMeasureView } from '@shopify/react-native-performance'
import { useQuery, useSuspenseQuery } from '@tanstack/react-query'
import React, { PropsWithChildren, Suspense, useCallback, useMemo, useRef } from 'react'
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
  const navigation = useEventDetailScreenNavigation()
  const { params } = useEventDetailScreenRoute()
  const { requestReview } = useStoreReview()
  const ticketSheetRef = useRef<BottomSheetModal>(null)

  const { data: eventData, isLoading: isLoadingConcertDetail } = useSuspenseQuery({
    queryKey: apiClient.event.queryKeys.detail({ eventId: params.eventId }),
    queryFn: () => apiClient.event.getDetail({ eventId: params.eventId }),
  })
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
      concertId: params.eventId,
    })
  }, [meData, navigation, params.eventId, subscribedConcert, toggleSubscribeConcert])

  const mainVenue = useMemo(() => {
    if (eventData.type !== 'concert') {
      return null
    }
    return eventData.data.venues.at(0)
  }, [eventData.data.venues, eventData.type])

  const sections: ConcertDetailSectionListSections = useMemo(() => {
    if (!eventData || eventData.type !== 'concert') {
      return []
    }
    const { data: concertDetail } = eventData
    const innerSections: ConcertDetailSectionListSections = [
      {
        title: 'title',
        data: [
          {
            title: concertDetail.title,
          },
        ],
      },
      {
        title: 'venue',
        sectionHeaderTitle: '공연 장소',
        data: [
          {
            location: mainVenue?.name ?? '',
          },
        ],
      },
      {
        title: 'date',
        sectionHeaderTitle: '공연 날짜',
        data: [
          {
            date: concertDetail.date ?? new Date().toISOString(),
            isKOPIS: concertDetail.isKOPIS,
          },
        ],
      },
      {
        title: 'tickets',
        sectionHeaderTitle: '티켓',
        data: [
          {
            tickets: concertDetail.tickets,
            onPressCta: () => {
              ticketSheetRef.current?.present()
            },
          },
        ],
      },
      {
        title: 'lineup',
        sectionHeaderTitle: '라인업',
        data: concertDetail.artists.map((artist) => ({
          thumbUrl: artist.thumbUrl ?? '',
          name: artist.name,
          artistId: artist.id,
          onPress: () => {
            navigation.navigate('ArtistStackNavigation', {
              screen: 'ArtistDetailScreen',
              params: {
                artistId: artist.id,
              },
            })
          },
        })),
      },
      {
        title: 'venue-map',
        sectionHeaderTitle: '공연 장소',
        data: [
          {
            latitude: mainVenue?.lat ?? 0.0,
            longitude: mainVenue?.lng ?? 0.0,
            address: mainVenue?.address ?? '',
            onPressMap: () => mapDetailBottomSheetModalRef.current?.present(),
            venueId: mainVenue?.id ?? '',
            venueTitle: mainVenue?.name ?? '',
            onPressProfile: () => {
              if (!mainVenue?.id) {
                return
              }
              navigation.navigate('VenueStackNavigation', {
                screen: 'VenueDetailScreen',
                params: {
                  id: mainVenue.id,
                },
              })
            },
          },
        ],
      },
    ]
    return innerSections
  }, [eventData, mainVenue, navigation])

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

  if (eventData.type !== 'concert') {
    return null
  }

  const { data: concertDetail } = eventData

  return (
    <EventDetailScreenLayout>
      <StatusBar hidden={Platform.OS === 'ios'} />
      <View style={[styles.wrapper, { backgroundColor: semantics.background[3] }]}>
        {isLoadingConcertDetail ? (
          <Spinner />
        ) : (
          <>
            <ConcertDetailSectionList
              sections={sections}
              thumbnails={concertDetail.posters.map((poster) => poster.url ?? '')}
              isSubscribed={!!subscribedConcert}
              onPressSubscribe={onPressSubscribe}
            />
          </>
        )}
      </View>
      {mainVenue && (
        <ConcertDetailVenueMapBottomSheet
          ref={mapDetailBottomSheetModalRef}
          address={mainVenue.address ?? ''}
          region={{
            latitude: mainVenue.lat,
            longitude: mainVenue.lng,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          markerCoordinate={{
            latitude: mainVenue.lat,
            longitude: mainVenue.lng,
          }}
        />
      )}
      <TicketListBottomSheet
        ref={ticketSheetRef}
        onPressBackdrop={() => ticketSheetRef.current?.close()}
        tickets={eventData.data.tickets}
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
