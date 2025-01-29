/* eslint-disable react-hooks/rules-of-hooks */
import { ConcertVenueMapView } from '@/features/map/ui/concert-venue-map-view/concert-venue-map-view'
import { ArtistSubscribeButton, VenueSubscribeButton } from '@/features/subscribe'
import { KOPIS_COPYRIGHT_TEXT } from '@/lib'
import { useEventDetailScreenNavigation } from '@/screens/event-detail-screen/event-detail-screen.hooks'
import { TicketItem } from '@/ui'
import { colors } from '@coldsurfers/ocean-road'
import { Button, ProfileThumbnail, Text, useColorScheme } from '@coldsurfers/ocean-road/native'
import Clipboard from '@react-native-clipboard/clipboard'
import { format } from 'date-fns'
import { Copy, MapPin } from 'lucide-react-native'
import { memo } from 'react'
import { Dimensions, Linking, StyleSheet, TouchableOpacity, View } from 'react-native'
import { VENUE_MAP_HEIGHT } from './concert-detail-section-list-item.constants'
import {
  ConcertDetailSectionListDateItemProps,
  ConcertDetailSectionListLineupItemProps,
  ConcertDetailSectionListLocationItemProps,
  ConcertDetailSectionListPriceItemProps,
  ConcertDetailSectionListTicketOpenDateItemProps,
  ConcertDetailSectionListTicketSellerItemProps,
  ConcertDetailSectionListTicketsItemProps,
  ConcertDetailSectionListTitleItemProps,
  ConcertDetailSectionListVenueMapItemProps,
} from './concert-detail-section-list-item.types'

export const ConcertDetailSectionListItem = () => null

ConcertDetailSectionListItem.DateItem = ({ date, isKOPIS }: ConcertDetailSectionListDateItemProps) => {
  const { semantics } = useColorScheme()
  return (
    <>
      <Text style={[styles.text, styles.dateText, { color: semantics.foreground[2] }]}>
        {format(new Date(date ?? ''), 'MMM dd, hh:mm a')}
      </Text>
      {isKOPIS ? (
        <Text weight="medium" style={styles.kopis}>
          {KOPIS_COPYRIGHT_TEXT}
        </Text>
      ) : null}
    </>
  )
}
ConcertDetailSectionListItem.LocationItem = ({ location }: ConcertDetailSectionListLocationItemProps) => {
  const { semantics } = useColorScheme()
  return <Text style={[styles.text, styles.venueText, { color: semantics.foreground[1] }]}>{location}</Text>
}
ConcertDetailSectionListItem.PriceInfoItem = ({ priceInfo }: ConcertDetailSectionListPriceItemProps) => {
  const { semantics } = useColorScheme()
  return (
    <View style={styles.wrapper}>
      <Text style={{ color: semantics.foreground[1] }}>{priceInfo.description}</Text>
      <Text style={{ color: semantics.foreground[1] }}>{priceInfo.price}</Text>
    </View>
  )
}
ConcertDetailSectionListItem.TicketOpenDateItem = ({
  openDate,
  description,
}: ConcertDetailSectionListTicketOpenDateItemProps) => {
  const { semantics } = useColorScheme()
  return (
    <View>
      <Text style={[styles.text, { color: semantics.foreground[1] }]}>{description}</Text>
      <Text style={[styles.text, { color: semantics.foreground[1] }]}>
        {format(new Date(openDate), 'yyyy-MM-dd HH시 mm분')}
      </Text>
    </View>
  )
}
ConcertDetailSectionListItem.TitleItem = ({ title }: ConcertDetailSectionListTitleItemProps) => {
  const { semantics } = useColorScheme()
  return (
    <Text weight="bold" style={[styles.titleText, { color: semantics.foreground[1] }]}>
      {title}
    </Text>
  )
}

ConcertDetailSectionListItem.LineupItem = memo(
  ({ name, onPress, artistId, thumbUrl }: ConcertDetailSectionListLineupItemProps) => {
    const navigation = useEventDetailScreenNavigation()
    const { semantics } = useColorScheme()
    return (
      <TouchableOpacity onPress={onPress} style={styles.rowItem}>
        <View style={styles.profileLine}>
          <ProfileThumbnail type="circle" size="sm" emptyBgText={name.slice(0, 1)} imageUrl={thumbUrl} />
          <Text style={[styles.name, { color: semantics.foreground[1] }]}>{name}</Text>
        </View>
        <ArtistSubscribeButton
          artistId={artistId}
          onShouldLogin={() => {
            navigation.navigate('LoginStackNavigation', {
              screen: 'LoginSelectionScreen',
              params: {},
            })
          }}
          style={styles.marginLeftAuto}
        />
      </TouchableOpacity>
    )
  },
)
ConcertDetailSectionListItem.TicketSellerItem = ({ siteUrl, name }: ConcertDetailSectionListTicketSellerItemProps) => {
  const { semantics } = useColorScheme()
  const onPressTicketSeller = (url: string) => {
    Linking.canOpenURL(url).then((canOpen) => {
      if (canOpen) {
        Linking.openURL(url)
      }
    })
  }
  return (
    <TouchableOpacity onPress={() => siteUrl && onPressTicketSeller(siteUrl)} style={styles.wrapper}>
      <Text style={[styles.ticketSellerText, { color: semantics.foreground[1] }]}>{name}</Text>
    </TouchableOpacity>
  )
}
ConcertDetailSectionListItem.VenueMapItem = memo(
  ({
    latitude,
    longitude,
    address,
    onPressMap,
    venueTitle,
    onPressProfile,
    venueId,
  }: ConcertDetailSectionListVenueMapItemProps) => {
    const navigation = useEventDetailScreenNavigation()
    const { semantics } = useColorScheme()
    return (
      <View>
        <TouchableOpacity onPress={onPressProfile} style={styles.rowItem}>
          <View style={styles.profileLine}>
            <ProfileThumbnail type="circle" size="sm" emptyBgText={venueTitle.at(0) ?? ''} />
            <Text style={[styles.name, { color: semantics.foreground[1] }]}>{venueTitle}</Text>
          </View>
          <VenueSubscribeButton
            venueId={venueId}
            onShouldLogin={() => {
              navigation.navigate('LoginStackNavigation', {
                screen: 'LoginSelectionScreen',
                params: {},
              })
            }}
            style={styles.marginLeftAuto}
          />
        </TouchableOpacity>
        <View style={styles.venueMapAddressWrapper}>
          <MapPin color={semantics.foreground[1]} />
          <Text style={[styles.venueMapAddressText, { color: semantics.foreground[1] }]}>{address}</Text>
          <TouchableOpacity onPress={() => Clipboard.setString(address)} style={styles.venueMapAddressCopyBtn}>
            <Copy color={semantics.foreground[1]} />
          </TouchableOpacity>
        </View>
        <ConcertVenueMapView
          region={{
            latitude,
            longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          scrollEnabled={false}
          onPress={onPressMap}
          markerCoordinate={{
            latitude,
            longitude,
          }}
        />
      </View>
    )
  },
)

ConcertDetailSectionListItem.TicketsItem = ({ tickets, onPressCta }: ConcertDetailSectionListTicketsItemProps) => {
  if (tickets.length === 0) return null
  if (tickets.length === 1) return <TicketItem {...tickets[0]} />

  return (
    <Button theme="pink" onPress={onPressCta} style={styles.bigTicketBtn}>
      티켓 찾기
    </Button>
  )
}

const styles = StyleSheet.create({
  ticketWrapper: {
    paddingVertical: 12,
    paddingHorizontal: 12,
    marginHorizontal: 12,
    marginTop: 8,
    marginBottom: 8,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  ticketBtn: {
    marginLeft: 'auto',
  },
  bigTicketBtn: {
    marginHorizontal: 12,
    marginVertical: 8,
  },
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
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: { width: 42, height: 42, borderRadius: 42 / 2 },
  name: {
    marginLeft: 8,
    fontWeight: '500',
    fontSize: 14,
  },
  ticketSellerText: {
    fontSize: 16,
    textDecorationLine: 'underline',
    color: '#2e94f4',
  },
  dateText: {
    fontSize: 14,
    color: colors.oc.black.value,
  },
  venueText: { color: colors.oc.gray[8].value, fontSize: 14, marginTop: 8, marginBottom: 4 },
  venueMap: {
    width: Dimensions.get('screen').width - 12 * 2,
    height: VENUE_MAP_HEIGHT,
    marginLeft: 'auto',
    marginRight: 'auto',
    borderRadius: 8,
    marginTop: 4,
  },
  venueMapMarker: {
    fontSize: 24,
  },
  venueMapAddressWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 12,
    paddingHorizontal: 12,
    paddingTop: 4,
  },
  venueMapAddressText: {
    fontSize: 16,
    marginLeft: 4,
  },
  venueMapAddressCopyBtn: {
    marginLeft: 'auto',
  },
  profileLine: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  marginLeftAuto: { marginLeft: 'auto' },
  rowItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginHorizontal: 12,
    marginVertical: 8,
    borderRadius: 8,
    borderColor: colors.oc.gray[4].value,
    borderWidth: 1.5,
  },
  kopis: {
    fontSize: 12,
    paddingHorizontal: 12,
    marginVertical: 8,
    color: colors.oc.gray[3].value,
  },
})
