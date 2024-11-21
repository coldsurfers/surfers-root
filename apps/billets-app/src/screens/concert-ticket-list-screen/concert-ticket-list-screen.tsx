import commonStyles from '@/lib/common-styles'
import useConcertQuery from '@/lib/react-query/queries/useConcertQuery'
import { CommonBackIconButton, CommonScreenLayout } from '@/ui'
import { colors } from '@coldsurfers/ocean-road'
import { Button, Text } from '@coldsurfers/ocean-road/native'
import { format } from 'date-fns'
import { useCallback, useMemo } from 'react'
import { Dimensions, FlatList, Linking, ListRenderItem, StyleSheet, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import {
  useConcertTicketListScreenNavigation,
  useConcertTicketListScreenRoute,
} from './concert-ticket-list-screen.hooks'

const ListHeader = ({
  posterThumbnail,
  concertTitle,
  concertVenue,
  concertDate,
}: {
  posterThumbnail: string
  concertTitle: string
  concertDate: string
  concertVenue: string
}) => {
  return (
    <View>
      <View style={styles.headerImageWrapper}>
        <FastImage source={{ uri: posterThumbnail }} style={styles.headerImage} />
      </View>
      <View style={styles.headerContentWrapper}>
        <Text weight="bold" style={styles.headerTitle}>
          {concertTitle}
        </Text>
        <Text style={styles.headerDate}>{format(new Date(concertDate ?? ''), 'MMM dd, hh:mm a')}</Text>
        <Text style={styles.headerVenue}>{concertVenue}</Text>
      </View>
    </View>
  )
}

export const ConcertTicketListScreen = () => {
  const { top: topInset, bottom: bottomInset } = useSafeAreaInsets()
  const navigation = useConcertTicketListScreenNavigation()
  const route = useConcertTicketListScreenRoute()
  const { concertId } = route.params
  const { data } = useConcertQuery({
    concertId,
  })

  const posterThumbnail = useMemo(() => {
    return data?.posters.at(0)?.imageUrl
  }, [data?.posters])
  const concertTitle = useMemo(() => {
    return data?.title
  }, [data?.title])
  const concertDate = useMemo(() => {
    return data?.date
  }, [data?.date])
  const concertVenue = useMemo(() => {
    return data?.venues.at(0)?.venueTitle
  }, [data?.venues])
  const ticketsData = useMemo(() => {
    return data?.tickets ?? []
  }, [data?.tickets])

  const renderItem = useCallback<ListRenderItem<(typeof ticketsData)[number]>>((info) => {
    const { prices, seller, openDate } = info.item
    const cheapestPrice =
      prices.length > 0
        ? prices.reduce((min, current) => {
            return current.price < min.price ? current : min
          }, prices[0])
        : null
    const formattedPrice = cheapestPrice
      ? `${new Intl.NumberFormat('en-US', { style: 'currency', currency: cheapestPrice.currency }).format(
          cheapestPrice.price,
        )}`
      : ''
    return (
      <View style={styles.ticketItemWrapper}>
        <View style={styles.ticketItemTop}>
          <Text style={styles.ticketItemEmoji}>🎫</Text>
          <View style={styles.ticketItemPriceWrapper}>
            <Text style={styles.ticketItemSeller}>{seller}</Text>
            <Text>최저가 {formattedPrice}</Text>
            <Text>{format(new Date(openDate), 'yyyy년 MM월 dd일 HH시 mm분 오픈')}</Text>
          </View>
        </View>
        <View style={styles.ticketItemBottom}>
          <Button
            onPress={() => {
              Linking.openURL(info.item.url)
            }}
            style={styles.ticketItemCTA}
          >
            <Text weight="medium" style={styles.ticketItemCTAText}>
              구매하기 - {formattedPrice}부터
            </Text>
          </Button>
        </View>
      </View>
    )
  }, [])

  return (
    <CommonScreenLayout edges={[]}>
      <FlatList
        style={styles.listStyle}
        contentContainerStyle={{
          paddingBottom: bottomInset + 32,
        }}
        data={ticketsData}
        renderItem={renderItem}
        ListHeaderComponent={
          <ListHeader
            concertTitle={concertTitle ?? ''}
            concertDate={concertDate ?? ''}
            concertVenue={concertVenue ?? ''}
            posterThumbnail={posterThumbnail ?? ''}
          />
        }
        bounces={false}
      />
      <CommonBackIconButton top={topInset} onPress={() => navigation.goBack()} />
    </CommonScreenLayout>
  )
}

const styles = StyleSheet.create({
  listStyle: { flex: 1 },
  ticketItemWrapper: {
    marginHorizontal: 12,
    ...commonStyles.shadowBox,
    backgroundColor: colors.oc.white.value,
    borderRadius: 8,
    padding: 8,
    marginTop: 12,
  },
  ticketItemTop: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.oc.gray[4].value,
    paddingBottom: 12,
  },
  ticketItemEmoji: { fontSize: 24 },
  ticketItemPriceWrapper: { marginLeft: 12 },
  ticketItemBottom: { marginTop: 12 },
  ticketItemCTA: { backgroundColor: colors.oc.cyan[8].value },
  ticketItemCTAText: { color: colors.oc.white.value },
  headerImageWrapper: { width: '100%', height: Dimensions.get('screen').height / 2 },
  headerImage: { width: '100%', height: '100%' },
  headerContentWrapper: { marginTop: 24, paddingHorizontal: 12 },
  headerTitle: { fontSize: 20 },
  headerDate: { marginTop: 6 },
  headerVenue: { marginTop: 6, color: colors.oc.gray[8].value },
  ticketItemSeller: {
    fontWeight: '600',
  },
})
