import { CONCERT_DETAIL_LIST_HEADER_HEIGHT } from '@/lib'
import { colors } from '@coldsurfers/ocean-road'
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
  ConcertDetailSectionListTitleItemProps,
} from '../concert-detail-section-list-item'
import {
  ConcertDetailSectionListItemT,
  ConcertDetailSectionListProps,
  ConcertDetailSectionListSection,
  ConcertDetailSectionListSectionT,
} from './concert-detail-section-list.types'

export const ConcertDetailSectionList = ({ sections, thumbnails }: ConcertDetailSectionListProps) => {
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
          // case 'venue':
          // case 'date':
          // case 'price-info':
          // case 'ticket-seller':
          // case 'ticket-open-date':
          children = sectionHeaderTitle ? <ConcertDetailSectionListHeaderItem title={sectionHeaderTitle} /> : null
          break
        // case 'html':
        //   children = <ConcertDetailSectionListHeaderItem title="종합 정보" />
        //   break
        default:
          children = null
          break
      }
      if (children === null) {
        return null
      }
      return <View style={styles.headerWrapper}>{children}</View>
    },
    [],
  )

  const renderItem: SectionListRenderItem<ConcertDetailSectionListItemT, ConcertDetailSectionListSectionT> =
    useCallback((info) => {
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
        default:
          children = null
          break
      }
      return <View style={styles.commonContentWrapper}>{children}</View>
    }, [])

  return (
    <>
      <Animated.SectionList
        contentContainerStyle={{
          backgroundColor: colors.oc.gray[1].value,
          flexGrow: 1,
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
    marginBottom: 4,
  },
  commonContentWrapper: {
    backgroundColor: colors.oc.gray[1].value,
  },
  thumbnail: {
    width: '100%',
    height: '100%',
  },
})
