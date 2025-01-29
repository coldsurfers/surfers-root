import { ConcertSubscribeButton } from '@/features/subscribe'
import { CONCERT_DETAIL_LIST_HEADER_HEIGHT } from '@/lib'
import { colors } from '@coldsurfers/ocean-road'
import { useColorScheme } from '@coldsurfers/ocean-road/native'
import React, { ReactElement, ReactNode, useCallback } from 'react'
import { Animated, SectionListRenderItem, StyleSheet, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import { ConcertDetailSectionListHeaderItem } from '../concert-detail-section-list-header-item'
import {
  ConcertDetailSectionListDateItemProps,
  ConcertDetailSectionListItem,
  ConcertDetailSectionListLineupItemProps,
  ConcertDetailSectionListLocationItemProps,
  ConcertDetailSectionListPriceItemProps,
  ConcertDetailSectionListTicketOpenDateItemProps,
  ConcertDetailSectionListTicketSellerItemProps,
  ConcertDetailSectionListTicketsItemProps,
  ConcertDetailSectionListTitleItemProps,
  ConcertDetailSectionListVenueMapItemProps,
  VENUE_MAP_HEIGHT,
} from '../concert-detail-section-list-item'
import {
  ConcertDetailSectionListItemT,
  ConcertDetailSectionListProps,
  ConcertDetailSectionListSection,
  ConcertDetailSectionListSectionT,
} from './concert-detail-section-list.types'

export const ConcertDetailSectionList = ({
  sections,
  thumbnails,
  isSubscribed,
  onPressSubscribe,
}: ConcertDetailSectionListProps) => {
  const { semantics } = useColorScheme()
  const [scrollY] = React.useState(new Animated.Value(0))
  const coverTranslateY = scrollY.interpolate({
    inputRange: [-4, 0, 10],
    outputRange: [-2, 0, 3],
  })
  const coverScale = scrollY.interpolate({
    inputRange: [-200, 0],
    outputRange: [2, 1],
    extrapolateRight: 'clamp',
  })
  const renderSectionHeader: (info: { section: ConcertDetailSectionListSection }) => ReactElement | null = useCallback(
    (info) => {
      const { title, sectionHeaderTitle, data } = info.section
      let children: ReactNode = null
      if (data.length === 0) {
        return null
      }
      switch (title) {
        case 'lineup':
        case 'venue-map':
          children = sectionHeaderTitle ? <ConcertDetailSectionListHeaderItem title={sectionHeaderTitle} /> : null
          break
        default:
          children = null
          break
      }
      if (children === null) {
        return null
      }
      return <View style={[styles.headerWrapper, { backgroundColor: semantics.background[3] }]}>{children}</View>
    },
    [semantics.background],
  )

  const renderItem: SectionListRenderItem<ConcertDetailSectionListItemT, ConcertDetailSectionListSectionT> =
    useCallback(
      (info) => {
        const { title } = info.section
        let children: ReactNode = null
        switch (title) {
          case 'title':
            children = (
              <ConcertDetailSectionListItem.TitleItem
                title={(info.item as ConcertDetailSectionListTitleItemProps).title}
              />
            )
            break
          case 'date':
            children = (
              <ConcertDetailSectionListItem.DateItem date={(info.item as ConcertDetailSectionListDateItemProps).date} />
            )
            break
          case 'tickets':
            children = (
              <ConcertDetailSectionListItem.TicketsItem {...(info.item as ConcertDetailSectionListTicketsItemProps)} />
            )
            break
          case 'venue':
            children = (
              <ConcertDetailSectionListItem.LocationItem
                location={(info.item as ConcertDetailSectionListLocationItemProps).location}
              />
            )
            break
          case 'lineup':
            children = (
              <ConcertDetailSectionListItem.LineupItem {...(info.item as ConcertDetailSectionListLineupItemProps)} />
            )
            break
          case 'ticket-seller':
            children = (
              <ConcertDetailSectionListItem.TicketSellerItem
                {...(info.item as ConcertDetailSectionListTicketSellerItemProps)}
              />
            )
            break
          case 'price-info':
            children = (
              <ConcertDetailSectionListItem.PriceInfoItem
                priceInfo={{ ...(info.item as ConcertDetailSectionListPriceItemProps).priceInfo }}
              />
            )
            break
          case 'ticket-open-date':
            children = (
              <ConcertDetailSectionListItem.TicketOpenDateItem
                {...(info.item as ConcertDetailSectionListTicketOpenDateItemProps)}
              />
            )
            break
          case 'venue-map':
            children = (
              <ConcertDetailSectionListItem.VenueMapItem
                {...(info.item as ConcertDetailSectionListVenueMapItemProps)}
              />
            )
            break
          default:
            children = null
            break
        }
        return (
          <View style={[styles.commonContentWrapper, { backgroundColor: semantics.background[3] }]}>{children}</View>
        )
      },
      [semantics.background],
    )

  return (
    <>
      <Animated.SectionList
        contentContainerStyle={{
          backgroundColor: semantics.background[3],
          flexGrow: 1,
          paddingBottom: VENUE_MAP_HEIGHT,
        }}
        stickySectionHeadersEnabled={false}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  y: scrollY,
                },
              },
            },
          ],
          {
            useNativeDriver: true,
          },
        )}
        ListHeaderComponent={
          <Animated.View
            style={{
              height: CONCERT_DETAIL_LIST_HEADER_HEIGHT,
              transform: [
                {
                  translateY: coverTranslateY,
                },
                {
                  scale: coverScale,
                },
              ],
            }}
          >
            <FastImage
              source={{
                uri: thumbnails[0],
              }}
              style={styles.thumbnail}
            />
            <View style={styles.subscribeButtonPosition}>
              <ConcertSubscribeButton onPress={onPressSubscribe} isSubscribed={!!isSubscribed} />
            </View>
          </Animated.View>
        }
        sections={sections}
        renderSectionHeader={renderSectionHeader}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />
    </>
  )
}

const styles = StyleSheet.create({
  headerWrapper: {
    backgroundColor: colors.oc.gray[1].value,
    marginTop: 12,
  },
  commonContentWrapper: {
    backgroundColor: colors.oc.gray[1].value,
  },
  thumbnail: {
    width: '100%',
    height: '100%',
  },
  subscribeButtonPosition: { position: 'absolute', right: 12, bottom: 12 },
})
