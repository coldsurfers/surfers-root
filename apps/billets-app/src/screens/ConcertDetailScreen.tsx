import { palette, IconButton, Spinner } from 'fstvllife-design-system'
import React, { useMemo } from 'react'
import { StatusBar, StyleSheet, View } from 'react-native'
import { ConcertDetailList, ConcertDetailSectionListSections } from '../components/List/ConcertDetailList'
import useConcertQuery from '../lib/hooks/queries/useConcertQuery'
import { useConcertDetailScreenNavigation, useConcertDetailScreenRoute } from './ConcertDetailScreen.hooks'
import format from 'date-fns/format'

const ConcertDetailScreen = () => {
  const navigation = useConcertDetailScreenNavigation()
  const { params } = useConcertDetailScreenRoute()
  const { data, isLoading: isLoadingConcert } = useConcertQuery({
    concertId: params.concertId,
  })
  console.log(data)

  const sections: ConcertDetailSectionListSections = useMemo(() => {
    if (!data) {
      return []
    }
    if (data.posters?.length === 0) {
      return []
    }
    // if (data.html) {
    //   return [
    //     {
    //       title: 'title',
    //       data: [
    //         {
    //           title: data.title,
    //         },
    //       ],
    //     },
    //     {
    //       title: 'html',
    //       data: [
    //         {
    //           html: data.html,
    //         },
    //       ],
    //     },
    //   ];
    // }
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
        title: 'venue',
        sectionHeaderTitle: '공연 장소',
        data: [
          {
            name: `${data.venues.at(0)?.venueTitle ?? ''}`,
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
        title: 'lineup',
        sectionHeaderTitle: '라인업',
        data: data.artists.map((artist) => ({
          thumbnailUrl: artist.profileImageUrl,
          name: artist.name,
        })),
      },
      {
        title: 'ticket-open-date',
        sectionHeaderTitle: '티켓 오픈 날짜',
        data: data.tickets.at(0)?.openDate
          ? [
              {
                description: '',
                openDate: format(new Date(data.tickets.at(0)?.openDate ?? ''), 'yyyy-MM-dd HH:mm'),
              },
            ]
          : [],
      },
      {
        title: 'ticket-seller',
        sectionHeaderTitle: '티켓 판매처',
        data: data.tickets.map((ticket) => ({
          siteUrl: ticket.url,
          name: ticket.url,
        })),
        // data: data.ticketSellers.map(seller => ({
        //   siteUrl: seller.urlLink,
        //   name: seller.name,
        // })),
      },
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
        <ConcertDetailList sections={sections} thumbnails={data?.posters?.map((thumb) => thumb.imageUrl) ?? []} />
        <IconButton
          icon="←"
          color="transparentDarkGray"
          onPress={navigation.goBack}
          style={styles.backButtonPosition}
        />
        {isLoadingConcert ? <Spinner /> : null}
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: palette.white,
  },
  backButtonPosition: {
    position: 'absolute',
    left: 15,
    top: 40,
  },
})

export default ConcertDetailScreen
