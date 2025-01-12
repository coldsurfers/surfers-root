/* eslint-disable react-hooks/rules-of-hooks */
import { ConcertVenueMapView } from '@/features/map/ui/concert-venue-map-view/concert-venue-map-view'
import { ArtistSubscribeButton, VenueSubscribeButton } from '@/features/subscribe'
import { apiClient } from '@/lib/api/openapi-client'
import { useConcertDetailScreenNavigation } from '@/screens/concert-detail-screen/concert-detail-screen.hooks'
import { colors } from '@coldsurfers/ocean-road'
import { ProfileThumbnail, Text, useColorScheme } from '@coldsurfers/ocean-road/native'
import Clipboard from '@react-native-clipboard/clipboard'
import { useQuery } from '@tanstack/react-query'
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
  const { semantics } = useColorScheme()
  return (
    <Text style={[styles.text, styles.dateText, { color: semantics.foreground[2] }]}>
      {format(new Date(date ?? ''), 'MMM dd, hh:mm a')}
    </Text>
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

const LineupItemProfileThumbnail = ({ artistId, artistName }: { artistId: string; artistName: string }) => {
  const { data: profileImages } = useQuery({
    queryKey: apiClient.queryKeys.artistProfileImage.listByArtistId(artistId),
    queryFn: () => apiClient.artistProfileImage.getArtistProfileImagesByArtistId(artistId),
  })
  const mainProfileImage = profileImages?.at(0)
  return <ProfileThumbnail type="circle" size="sm" emptyBgText={artistName} imageUrl={mainProfileImage?.url} />
}

ConcertDetailSectionListItem.LineupItem = memo(
  ({ name, onPress, artistId }: ConcertDetailSectionListLineupItemProps) => {
    const navigation = useConcertDetailScreenNavigation()
    const { semantics } = useColorScheme()
    return (
      <TouchableOpacity onPress={onPress} style={styles.rowItem}>
        <View style={styles.profileLine}>
          <LineupItemProfileThumbnail artistId={artistId} artistName={name} />
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
    const navigation = useConcertDetailScreenNavigation()
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
