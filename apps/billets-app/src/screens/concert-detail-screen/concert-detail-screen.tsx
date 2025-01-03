import {
  ConcertDetailSectionList,
  ConcertDetailSectionListSections,
  ConcertDetailVenueMapBottomSheet,
} from '@/features/concert-detail'
import { useInterstitialAd } from '@/features/google-ads'
import { useToggleSubscribeConcert } from '@/features/subscribe'
import { useEffectOnce, useStoreReview } from '@/lib'
import commonStyles from '@/lib/common-styles'
import useConcertQuery from '@/lib/react-query/queries/useConcertQuery'
import useGetMeQuery from '@/lib/react-query/queries/useGetMeQuery'
import useSubscribedConcertQuery from '@/lib/react-query/queries/useSubscribedConcertQuery'
import {
  concertDetailCountForStoreReviewStorage,
  concertTicketBtnPressCountForInterstitialAdStorage,
} from '@/lib/storage'
import { NAVIGATION_HEADER_HEIGHT } from '@/ui'
import { colors } from '@coldsurfers/ocean-road'
import { Button, Spinner } from '@coldsurfers/ocean-road/native'
import { BottomSheetModal } from '@gorhom/bottom-sheet'
import React, { Suspense, useCallback, useMemo, useRef } from 'react'
import { Dimensions, Platform, StatusBar, StyleSheet, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useConcertDetailScreenNavigation, useConcertDetailScreenRoute } from './concert-detail-screen.hooks'

const _ConcertDetailScreen = () => {
  const { bottom: bottomInset } = useSafeAreaInsets()
  const navigation = useConcertDetailScreenNavigation()
  const { params } = useConcertDetailScreenRoute()
  const { requestReview } = useStoreReview()

  const { data, isLoading: isLoadingConcert } = useConcertQuery({
    concertId: params.concertId,
  })
  const { data: subscribedConcert } = useSubscribedConcertQuery({
    concertId: params.concertId,
  })
  const { data: meData } = useGetMeQuery()
  const toggleSubscribeConcert = useToggleSubscribeConcert()

  const { show, loaded } = useInterstitialAd({
    onAdOpened: () => console.log('opened'),
    onAdClosed: () => {
      navigation.navigate('ConcertTicketListScreen', {
        concertId: params.concertId,
      })
    },
  })

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
      concertId: params.concertId,
    })
  }, [meData, navigation, params.concertId, subscribedConcert, toggleSubscribeConcert])

  const firstVenue = useMemo(() => {
    return data?.venues.at(0)
  }, [data?.venues])

  const sections: ConcertDetailSectionListSections = useMemo(() => {
    if (!data) {
      return []
    }
    if (data.posters?.length === 0) {
      return []
    }
    const innerSections: ConcertDetailSectionListSections = [
      {
        title: 'title',
        data: [
          {
            title: data.title,
          },
        ],
      },
      {
        title: 'date',
        sectionHeaderTitle: '공연 날짜',
        data: [
          {
            date: data.date,
          },
        ],
      },
      {
        title: 'venue',
        sectionHeaderTitle: '공연 장소',
        data: [
          {
            location: `${firstVenue?.venueTitle ?? ''}`,
          },
        ],
      },
      {
        title: 'lineup',
        sectionHeaderTitle: '라인업',
        data: data.artists.map((artist) => ({
          thumbnailUrl: artist.profileImageUrl,
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
            latitude: firstVenue?.latitude ?? 0.0,
            longitude: firstVenue?.longitude ?? 0.0,
            address: firstVenue?.address ?? '',
            onPressMap: () => mapDetailBottomSheetModalRef.current?.present(),
            venueId: firstVenue?.id ?? '',
            venueTitle: firstVenue?.venueTitle ?? '',
            onPressProfile: () => {
              if (!firstVenue?.id) {
                return
              }
              navigation.navigate('VenueStackNavigation', {
                screen: 'VenueDetailScreen',
                params: {
                  id: firstVenue.id,
                },
              })
            },
          },
        ],
      },
      // {
      //   title: 'ticket-open-date',
      //   sectionHeaderTitle: '티켓 오픈 날짜',
      //   data: data.tickets.at(0)?.openDate
      //     ? [
      //         {
      //           description: '',
      //           openDate: format(new Date(data.tickets.at(0)?.openDate ?? ''), 'yyyy-MM-dd HH:mm'),
      //         },
      //       ]
      //     : [],
      // },
      // {
      //   title: 'ticket-seller',
      //   sectionHeaderTitle: '티켓 판매처',
      //   data: data.tickets.map((ticket) => ({
      //     siteUrl: ticket.url,
      //     name: ticket.url,
      //   })),
      //   // data: data.ticketSellers.map(seller => ({
      //   //   siteUrl: seller.urlLink,
      //   //   name: seller.name,
      //   // })),
      // },
      // {
      //   title: 'price-info',
      //   sectionHeaderTitle: '가격 정보',
      //   data: data.tickets.map(ticket => ({
      //     description: '',
      //     price: ticket.formattedPrice,
      //   })),
      // },
    ]
    return innerSections
  }, [
    data,
    firstVenue?.address,
    firstVenue?.id,
    firstVenue?.latitude,
    firstVenue?.longitude,
    firstVenue?.venueTitle,
    navigation,
  ])

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

  const onPressTicketBtn = useCallback(async () => {
    const prevCount = concertTicketBtnPressCountForInterstitialAdStorage.get() ?? 0
    const nextCount = prevCount + 1
    concertTicketBtnPressCountForInterstitialAdStorage.set(nextCount)
    const shouldShowAd = nextCount % 5 === 0 && loaded
    if (shouldShowAd) {
      await show()
    } else {
      navigation.navigate('ConcertTicketListScreen', {
        concertId: params.concertId,
      })
    }
  }, [loaded, navigation, params.concertId, show])

  return (
    <View style={{ flex: 1, marginTop: -NAVIGATION_HEADER_HEIGHT }}>
      <StatusBar hidden={Platform.OS === 'ios'} />
      <View style={styles.wrapper}>
        {isLoadingConcert ? (
          <Spinner />
        ) : (
          <>
            <ConcertDetailSectionList
              sections={sections}
              thumbnails={data?.posters?.map((thumb) => thumb.imageUrl) ?? []}
              isSubscribed={!!subscribedConcert}
              onPressSubscribe={onPressSubscribe}
            />
            <View style={[styles.fixedBottom]}>
              <Button onPress={onPressTicketBtn} style={[styles.ticketBtn, { marginBottom: bottomInset }]}>
                🎫 티켓 찾기 🎫
              </Button>
            </View>
          </>
        )}
      </View>
      {firstVenue && (
        <ConcertDetailVenueMapBottomSheet
          ref={mapDetailBottomSheetModalRef}
          address={firstVenue.address}
          region={{
            latitude: firstVenue.latitude,
            longitude: firstVenue.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          markerCoordinate={{
            latitude: firstVenue.latitude,
            longitude: firstVenue.longitude,
          }}
        />
      )}
    </View>
  )
}

export const ConcertDetailScreen = () => {
  return (
    <Suspense fallback={<Spinner positionCenter />}>
      <_ConcertDetailScreen />
    </Suspense>
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
