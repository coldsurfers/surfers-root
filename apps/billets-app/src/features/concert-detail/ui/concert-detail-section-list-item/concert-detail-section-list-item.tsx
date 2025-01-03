import { ConcertVenueMapView } from '@/features/map/ui/concert-venue-map-view/concert-venue-map-view'
import { ArtistSubscribeButton, VenueSubscribeButton } from '@/features/subscribe'
import { useConcertDetailScreenNavigation } from '@/screens/concert-detail-screen/concert-detail-screen.hooks'
import { colors } from '@coldsurfers/ocean-road'
import { ProfileThumbnail, Text } from '@coldsurfers/ocean-road/native'
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
  ConcertDetailSectionListTitleItemProps,
  ConcertDetailSectionListVenueMapItemProps,
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
ConcertDetailSectionListItem.LineupItem = memo(
  ({ thumbnailUrl, name, onPress, artistId }: ConcertDetailSectionListLineupItemProps) => {
    const navigation = useConcertDetailScreenNavigation()
    return (
      <TouchableOpacity onPress={onPress} style={styles.rowItem}>
        <View style={styles.profileLine}>
          <ProfileThumbnail type="circle" size="sm" emptyBgText={name.at(0) ?? ''} imageUrl={thumbnailUrl} />
          <Text style={styles.name}>{name}</Text>
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
    const navigation = useConcertDetailScreenNavigation()

    return (
      <View>
        <TouchableOpacity onPress={onPressProfile} style={styles.rowItem}>
          <View style={styles.profileLine}>
            <ProfileThumbnail type="circle" size="sm" emptyBgText={venueTitle.at(0) ?? ''} />
            <Text style={styles.name}>{venueTitle}</Text>
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
          <MapPin />
          <Text style={styles.venueMapAddressText}>{address}</Text>
          <TouchableOpacity onPress={() => Clipboard.setString(address)} style={styles.venueMapAddressCopyBtn}>
            <Copy />
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
    marginTop: 6,
    fontSize: 14,
    color: colors.oc.black.value,
  },
  venueText: { marginTop: 6, color: colors.oc.gray[8].value, marginBottom: 8, fontSize: 14 },
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
})
