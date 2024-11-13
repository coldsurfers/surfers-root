import React, { memo, ReactElement, ReactNode, useCallback } from 'react'
import { Animated, SectionListRenderItem, StyleSheet, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import { CONCERT_DETAIL_LIST_HEADER_HEIGHT } from '../../../lib/constants'
import HeaderItem from './HeaderItem'
import GigDateItem from './ListItem/ConcertDateItem'
import GigLocationItem from './ListItem/ConcertLocationItem'
import ConcertPriceInfoItem from './ListItem/ConcertPriceInfoItem'
import ConcertTicketOpenDateItem from './ListItem/ConcertTicketOpenDateItem'
import ConcertTitleItem from './ListItem/ConcertTitleItem'
import ConcertWebview from './ListItem/ConcertWebview'
import LineupItem from './ListItem/LineupItem'
import TicketSellerItem from './ListItem/TicketSellerItem'
import type {
  ConcertDetailDateSectionData,
  ConcertDetailLineupSectionData,
  ConcertDetailSectionListItemT,
  ConcertDetailSectionListSection,
  ConcertDetailSectionListSections,
  ConcertDetailSectionListSectionT,
  ConcertDetailTicketSellerSectionData,
  ConcertDetailTitleSectionData,
  ConcertDetailVenueSectionData,
  ConcertHtmlSectionData,
  ConcertPriceSectionData,
  ConcertTicketOpenDateSectionData,
} from './types'

interface Props {
  sections: ConcertDetailSectionListSections
  thumbnails: string[]
  ListFooterComponent?: React.ComponentType<unknown> | React.ReactElement | null
}

const List = ({ sections, thumbnails, ListFooterComponent }: Props) => {
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
        case 'venue':
        case 'date':
        case 'price-info':
        case 'ticket-seller':
        case 'ticket-open-date':
          children = sectionHeaderTitle ? <HeaderItem title={sectionHeaderTitle} /> : null
          break
        case 'html':
          children = <HeaderItem title="종합 정보" />
          break
        default:
          children = null
          break
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
          children = <ConcertTitleItem title={(info.item as ConcertDetailTitleSectionData).title} />
          break
        case 'venue':
          children = <GigLocationItem location={(info.item as ConcertDetailVenueSectionData).name} />
          break
        case 'lineup':
          children = <LineupItem {...(info.item as ConcertDetailLineupSectionData)} />
          break
        case 'ticket-seller':
          children = <TicketSellerItem {...(info.item as ConcertDetailTicketSellerSectionData)} />
          break
        case 'date':
          children = <GigDateItem date={(info.item as ConcertDetailDateSectionData).date} />
          break
        case 'price-info':
          children = <ConcertPriceInfoItem priceInfo={{ ...(info.item as ConcertPriceSectionData) }} />
          break
        case 'ticket-open-date':
          children = <ConcertTicketOpenDateItem {...(info.item as ConcertTicketOpenDateSectionData)} />
          break
        case 'html':
          children = <ConcertWebview html={(info.item as ConcertHtmlSectionData).html} />
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
        contentContainerStyle={styles.container}
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
        ListFooterComponent={ListFooterComponent}
        sections={sections}
        renderSectionHeader={renderSectionHeader}
        renderItem={renderItem}
      />
    </>
  )
}

const styles = StyleSheet.create({
  headerWrapper: {},
  commonContentWrapper: {},
  thumbnail: {
    width: '100%',
    height: '100%',
  },
  container: {
    backgroundColor: 'white',
    paddingBottom: 12,
  },
})

export default memo(List)
