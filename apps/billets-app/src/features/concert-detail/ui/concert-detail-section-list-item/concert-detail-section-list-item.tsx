import { ConcertVenueMapView } from '@/features/map/ui/concert-venue-map-view/concert-venue-map-view'
import { v1QueryKeyFactory } from '@/lib/query-key-factory'
import {
  useSubscribeArtistQuery,
  useSubscribeVenueMutation,
  useSubscribeVenueQuery,
  useUnsubscribeVenueMutation,
} from '@/lib/react-query'
import useGetMeQuery from '@/lib/react-query/queries/useGetMeQuery'
import { useConcertDetailScreenNavigation } from '@/screens/concert-detail-screen/concert-detail-screen.hooks'
import { colors } from '@coldsurfers/ocean-road'
import { Button, ProfileThumbnail, Text } from '@coldsurfers/ocean-road/native'
import Clipboard from '@react-native-clipboard/clipboard'
import { useQueryClient } from '@tanstack/react-query'
import { format } from 'date-fns'
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
  ({ thumbnailUrl, name, onPress, artistId, onPressSubscribeArtist }: ConcertDetailSectionListLineupItemProps) => {
    const { data: subscribeArtistData } = useSubscribeArtistQuery({ artistId })

    return (
      <TouchableOpacity onPress={onPress} style={styles.rowItem}>
        <View style={styles.profileLine}>
          <ProfileThumbnail type="circle" size="sm" emptyBgText={name.at(0) ?? ''} imageUrl={thumbnailUrl} />
          <Text style={styles.name}>{name}</Text>
        </View>
        <Button
          size="sm"
          onPress={() => onPressSubscribeArtist({ isSubscribed: !!subscribeArtistData })}
          style={styles.marginLeftAuto}
        >
          {subscribeArtistData ? 'Following' : 'Follow'}
        </Button>
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
    const queryClient = useQueryClient()
    const { data: meData } = useGetMeQuery()
    const { data: subscribeVenueData } = useSubscribeVenueQuery({ venueId })
    const { mutate: subscribeVenue } = useSubscribeVenueMutation({
      onMutate: async (variables) => {
        if (!meData) {
          navigation.navigate('LoginStackScreen', {
            screen: 'LoginSelectionScreen',
            params: {},
          })
          return
        }
        await queryClient.cancelQueries({
          queryKey: v1QueryKeyFactory.venues.subscribed({
            venueId: variables.venueId,
          }).queryKey,
        })

        const newSubscribeVenue: Awaited<ReturnType<typeof useSubscribeVenueQuery>>['data'] = {
          userId: meData.id,
          venueId: variables.venueId,
        }

        queryClient.setQueryData(
          v1QueryKeyFactory.venues.subscribed({
            venueId: variables.venueId,
          }).queryKey,
          newSubscribeVenue,
        )

        return newSubscribeVenue
      },
      onSettled: (data) => {
        if (!data) {
          return
        }
        queryClient.invalidateQueries({
          queryKey: v1QueryKeyFactory.venues.subscribed({
            venueId: data.venueId,
          }).queryKey,
        })
      },
    })
    const { mutate: unsubscribeVenue } = useUnsubscribeVenueMutation({
      onMutate: async (variables) => {
        if (!meData) {
          navigation.navigate('LoginStackScreen', {
            screen: 'LoginSelectionScreen',
            params: {},
          })
          return
        }
        await queryClient.cancelQueries({
          queryKey: v1QueryKeyFactory.venues.subscribed({
            venueId: variables.venueId,
          }).queryKey,
        })

        queryClient.setQueryData(
          v1QueryKeyFactory.venues.subscribed({
            venueId: variables.venueId,
          }).queryKey,
          null,
        )

        return null
      },
      onSettled: (data) => {
        console.log(data)
        if (!data) {
          return
        }
        queryClient.invalidateQueries({
          queryKey: v1QueryKeyFactory.venues.subscribed({
            venueId: data.venueId,
          }).queryKey,
        })
      },
    })
    return (
      <View>
        <TouchableOpacity onPress={onPressProfile} style={styles.rowItem}>
          <View style={styles.profileLine}>
            <ProfileThumbnail type="circle" size="sm" emptyBgText={venueTitle.at(0) ?? ''} />
            <Text style={styles.name}>{venueTitle}</Text>
          </View>
          <Button
            size="sm"
            onPress={() => {
              if (subscribeVenueData) {
                unsubscribeVenue({
                  venueId,
                })
              } else {
                subscribeVenue({
                  venueId,
                })
              }
            }}
            style={styles.marginLeftAuto}
          >
            {subscribeVenueData ? 'Following' : 'Follow'}
          </Button>
        </TouchableOpacity>
        <View style={styles.venueMapAddressWrapper}>
          <Text style={styles.venueMapAddressText}>
            {'📍'} {address}
          </Text>
          <Button
            theme="transparent"
            onPress={() => Clipboard.setString(address)}
            style={styles.venueMapAddressCopyBtn}
          >
            복사하기
          </Button>
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
  venueText: { marginTop: 6, color: colors.oc.gray[8].value, marginBottom: 8 },
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
    paddingHorizontal: 12,
  },
  venueMapAddressText: {
    fontSize: 16,
    marginBottom: 8,
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
    backgroundColor: colors.oc.white.value,
    borderRadius: 4,
  },
})
