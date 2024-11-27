import { ConcertDetailSectionList, ConcertDetailSectionListSections, useToggleSubscribeConcert } from '@/features'
import commonStyles from '@/lib/common-styles'
import useConcertQuery from '@/lib/react-query/queries/useConcertQuery'
import useGetMeQuery from '@/lib/react-query/queries/useGetMeQuery'
import useSubscribedConcertQuery from '@/lib/react-query/queries/useSubscribedConcertQuery'
import { CommonBackIconButton, CommonImageViewer } from '@/ui'
import { colors } from '@coldsurfers/ocean-road'
import { Button, Modal, Spinner, Text } from '@coldsurfers/ocean-road/native'
import React, { useCallback, useMemo, useState } from 'react'
import { Pressable, StatusBar, StyleSheet, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { CONCERT_DETAIL_FIXED_BOTTOM_HEIGHT } from './concert-detail-screen.constants'
import { useConcertDetailScreenNavigation, useConcertDetailScreenRoute } from './concert-detail-screen.hooks'

export const ConcertDetailScreen = () => {
  const { bottom: bottomInset, top: topInset } = useSafeAreaInsets()
  const navigation = useConcertDetailScreenNavigation()
  const { params } = useConcertDetailScreenRoute()
  const { data, isLoading: isLoadingConcert } = useConcertQuery({
    concertId: params.concertId,
  })
  const { data: subscribedConcert } = useSubscribedConcertQuery({
    concertId: params.concertId,
  })
  const { data: meData } = useGetMeQuery()
  const toggleSubscribeConcert = useToggleSubscribeConcert()

  const [imageViewerVisible, setImageViewerVisible] = useState(false)

  const onPressSubscribe = useCallback(() => {
    if (!meData) {
      // @todo: show login modal
      navigation.navigate('LoginStackScreen', {
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
            location: `${data.venues.at(0)?.venueTitle ?? ''}`,
          },
        ],
      },
      {
        title: 'lineup',
        sectionHeaderTitle: '라인업',
        data: data.artists.map((artist) => ({
          thumbnailUrl: artist.profileImageUrl,
          name: artist.name,
          onPress: () => setImageViewerVisible(true),
        })),
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
  }, [data])

  return (
    <>
      <StatusBar hidden />
      <View style={styles.wrapper}>
        <ConcertDetailSectionList
          sections={sections}
          thumbnails={data?.posters?.map((thumb) => thumb.imageUrl) ?? []}
          isSubscribed={!!subscribedConcert}
          onPressSubscribe={onPressSubscribe}
        />
        <View style={[styles.fixedBottom, { paddingBottom: bottomInset }]}>
          <Button
            onPress={() => {
              navigation.navigate('ConcertTicketListScreen', {
                concertId: params.concertId,
              })
            }}
            style={{ backgroundColor: colors.oc.cyan[8].value }}
          >
            🎫 티켓 찾기 🎫
          </Button>
        </View>
        <CommonBackIconButton top={40} onPress={() => navigation.goBack()} />

        <Modal visible={imageViewerVisible}>
          <>
            <Pressable
              onPress={() => setImageViewerVisible(false)}
              style={[styles.imageViewerCloseButton, { top: topInset }]}
            >
              <Text style={styles.imageViewerCloseText}>닫기</Text>
            </Pressable>
            <CommonImageViewer imageUri={data?.artists.at(0)?.profileImageUrl ?? ''} />
          </>
        </Modal>
        {isLoadingConcert ? <Spinner /> : null}
      </View>
    </>
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
    paddingHorizontal: 14,
    width: '100%',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: CONCERT_DETAIL_FIXED_BOTTOM_HEIGHT,
    ...commonStyles.shadowBox,
  },
  imageViewerCloseButton: { position: 'absolute', zIndex: 99, right: 12 },
  imageViewerCloseText: { color: '#ffffff' },
})
