import { Pressable, Text, View, TouchableOpacity, StyleSheet } from 'react-native'
import FastImage from 'react-native-fast-image'
import commonStyles from '../../../lib/common-styles'
import useSubscribedConcertQuery from '../../../lib/hooks/queries/useSubscribedConcertQuery'
import palettes from '../../../lib/palettes'
import { memo, useCallback } from 'react'

const ConcertListItem = ({
  concertId,
  thumbnailUrl,
  title,
  date,
  venue,
  onPress,
  onPressSubscribe,
  size = 'large',
}: {
  concertId: string
  thumbnailUrl: string
  title: string
  date: string
  venue?: string
  onPress: (concertId: string) => void
  onPressSubscribe?: (params: { isSubscribed: boolean; concertId: string }) => void
  size?: 'small' | 'large'
}) => {
  const { data: subscribedConcertData } = useSubscribedConcertQuery({
    concertId,
  })
  const handlePress = useCallback(() => {
    onPress(concertId)
  }, [onPress, concertId])
  const handlePressSubscribe = useCallback(() => {
    onPressSubscribe?.({
      isSubscribed: !!subscribedConcertData,
      concertId,
    })
  }, [onPressSubscribe, subscribedConcertData, concertId])

  return (
    <Pressable
      onPress={handlePress}
      style={[
        {
          ...styles.concertListItem,
          ...commonStyles.shadowBox,
        },
        {
          width: size === 'small' ? 140 : '100%',
        },
      ]}
    >
      <FastImage
        source={{ uri: thumbnailUrl }}
        style={[
          styles.concertThumbnail,
          {
            height: size === 'small' ? 120 : 250,
          },
        ]}
      />
      <Text
        numberOfLines={size === 'small' ? 2 : 0}
        style={[
          styles.concertTitle,
          {
            fontSize: size === 'small' ? 14 : 18,
          },
        ]}
      >
        {title}
      </Text>
      <View style={styles.concertInfoWrapper}>
        <View>
          <Text
            style={[
              styles.concertFormattedDate,
              {
                fontSize: size === 'small' ? 12 : 14,
              },
            ]}
          >
            {date}
          </Text>
          {venue ? (
            <Text
              style={[
                styles.concertVenue,
                {
                  fontSize: size === 'small' ? 12 : 14,
                },
              ]}
            >
              {venue}
            </Text>
          ) : null}
        </View>
        {size === 'large' && (
          <TouchableOpacity
            onPress={handlePressSubscribe}
            style={[
              styles.concertSaveButton,
              {
                backgroundColor: subscribedConcertData ? palettes.black : palettes.white,
              },
            ]}
          >
            <Text style={styles.concertSaveButtonIcon}>❣️</Text>
          </TouchableOpacity>
        )}
      </View>
    </Pressable>
  )
}

export default memo(ConcertListItem)

const styles = StyleSheet.create({
  concertListItem: {
    width: '100%',
    backgroundColor: palettes.white,
    marginBottom: 12,
    padding: 12,
    borderRadius: 8,
  },
  concertThumbnail: {
    width: '100%',
    height: 250,
    borderRadius: 8,
    marginBottom: 12,
  },
  concertTitle: { fontWeight: 'bold', fontSize: 18 },
  concertFormattedDate: { marginTop: 8 },
  concertVenue: { marginTop: 8 },
  concertListContentContainer: {
    paddingHorizontal: 12,
    marginTop: 12,
    paddingBottom: 24,
    flexGrow: 1,
  },
  concertInfoWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  concertSaveButton: {
    marginLeft: 'auto',
    borderWidth: 1,
    borderRadius: 18,
    borderColor: palettes.gray['300'],
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  concertSaveButtonIcon: { fontSize: 24 },
})
