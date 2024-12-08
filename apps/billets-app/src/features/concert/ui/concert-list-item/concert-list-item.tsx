import { ConcertSubscribeButton } from '@/features/subscribe'
import { colors } from '@coldsurfers/ocean-road'
import { Text } from '@coldsurfers/ocean-road/native'
import { useCallback } from 'react'
import { Pressable, StyleSheet, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import palettes from '../../../../lib/palettes'
import useSubscribedConcertQuery from '../../../../lib/react-query/queries/useSubscribedConcertQuery'

export const ConcertListItem = ({
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
        styles.concertListItem,
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
      >
        {onPressSubscribe && (
          <View style={styles.subscribeBtnWrapper}>
            <ConcertSubscribeButton onPress={handlePressSubscribe} isSubscribed={!!subscribedConcertData} />
          </View>
        )}
      </FastImage>
      <View style={styles.bottom}>
        <View style={styles.concertInfoWrapper}>
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
        </View>
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  concertListItem: {
    width: '100%',
    backgroundColor: palettes.white,
    marginBottom: 12,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: colors.oc.black.value,
  },
  concertThumbnail: {
    width: '100%',
    height: 250,
    backgroundColor: 'black',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    borderBottomColor: colors.oc.black.value,
    borderBottomWidth: 1.5,
  },
  concertTitle: { fontWeight: 'bold', fontSize: 18, lineHeight: 20, color: colors.oc.black.value },
  concertFormattedDate: { marginTop: 8, fontSize: 14, lineHeight: 16, color: colors.oc.black.value },
  concertVenue: { marginTop: 8, color: colors.oc.black.value, fontSize: 14, lineHeight: 16 },
  concertListContentContainer: {
    paddingHorizontal: 12,
    marginTop: 12,
    paddingBottom: 24,
    flexGrow: 1,
  },
  concertInfoWrapper: {},
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
  bottom: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  subscribeBtnWrapper: { position: 'absolute', right: 12, bottom: 12 },
})
