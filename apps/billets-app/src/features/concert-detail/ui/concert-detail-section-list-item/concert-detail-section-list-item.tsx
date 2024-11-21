import { colors } from '@coldsurfers/ocean-road'
import { Text } from '@coldsurfers/ocean-road/native'
import { format } from 'date-fns'
import { Image, Linking, StyleSheet, TouchableOpacity, View } from 'react-native'
import {
  ConcertDetailSectionListDateItemProps,
  ConcertDetailSectionListLineupItemProps,
  ConcertDetailSectionListLocationItemProps,
  ConcertDetailSectionListPriceItemProps,
  ConcertDetailSectionListTicketOpenDateItemProps,
  ConcertDetailSectionListTicketSellerItemProps,
  ConcertDetailSectionListTitleItemProps,
} from './concert-detail-section-list-item.types'

export const ConcertDetailSectionListItem = () => null

ConcertDetailSectionListItem.DateItem = ({ date }: ConcertDetailSectionListDateItemProps) => {
  return <Text style={[styles.text, styles.dateText]}>{format(new Date(date ?? ''), 'MMM dd, hh:mm a')}</Text>
}
ConcertDetailSectionListItem.LocationItem = ({ location }: ConcertDetailSectionListLocationItemProps) => {
  return <Text style={[styles.text, styles.venueText]}>{location}</Text>
}
ConcertDetailSectionListItem.PriceInfoItem = ({ priceInfo }: ConcertDetailSectionListPriceItemProps) => {
  return (
    <View style={styles.wrapper}>
      <Text>{priceInfo.description}</Text>
      <Text>{priceInfo.price}</Text>
    </View>
  )
}
ConcertDetailSectionListItem.TicketOpenDateItem = ({
  openDate,
  description,
}: ConcertDetailSectionListTicketOpenDateItemProps) => {
  return (
    <View>
      <Text style={styles.text}>{description}</Text>
      <Text style={styles.text}>{format(new Date(openDate), 'yyyy-MM-dd HH시 mm분')}</Text>
    </View>
  )
}
ConcertDetailSectionListItem.TitleItem = ({ title }: ConcertDetailSectionListTitleItemProps) => {
  return (
    <Text weight="bold" style={styles.titleText}>
      {title}
    </Text>
  )
}
ConcertDetailSectionListItem.LineupItem = ({ thumbnailUrl, name }: ConcertDetailSectionListLineupItemProps) => {
  return (
    <View style={styles.lineupWrapper}>
      <Image style={styles.image} source={{ uri: thumbnailUrl }} />
      <Text style={styles.name}>{name}</Text>
    </View>
  )
}
ConcertDetailSectionListItem.TicketSellerItem = ({ siteUrl, name }: ConcertDetailSectionListTicketSellerItemProps) => {
  const onPressTicketSeller = (url: string) => {
    Linking.canOpenURL(url).then((canOpen) => {
      if (canOpen) {
        Linking.openURL(url)
      }
    })
  }
  return (
    <TouchableOpacity onPress={() => siteUrl && onPressTicketSeller(siteUrl)} style={styles.wrapper}>
      <Text style={styles.ticketSellerText}>{name}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  text: {
    paddingHorizontal: 12,
  },
  titleText: {
    fontSize: 20,
    marginTop: 24,
    paddingHorizontal: 12,
  },
  wrapper: {
    paddingHorizontal: 12,
  },
  lineupWrapper: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    marginTop: 12,
  },
  image: { width: 42, height: 42, borderRadius: 42 / 2 },
  name: {
    marginLeft: 8,
    fontWeight: '500',
    fontSize: 16,
  },
  ticketSellerText: {
    fontSize: 16,
    textDecorationLine: 'underline',
    color: '#2e94f4',
  },
  dateText: {
    marginTop: 6,
  },
  venueText: { marginTop: 6, color: colors.oc.gray[8].value },
})
