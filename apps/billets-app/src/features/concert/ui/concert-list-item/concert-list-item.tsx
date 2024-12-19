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
          padding: size === 'small' ? 0 : 12,
        },
      ]}
    >
      <FastImage
        source={{ uri: thumbnailUrl }}
        style={[
          styles.concertThumbnail,
          {
            borderBottomLeftRadius: size === 'small' ? 0 : 8,
            borderBottomRightRadius: size === 'small' ? 0 : 8,
          },
        ]}
      >
        {onPressSubscribe && (
          <View style={styles.subscribeBtnWrapper}>
            <ConcertSubscribeButton onPress={handlePressSubscribe} isSubscribed={!!subscribedConcertData} />
          </View>
        )}
      </FastImage>
      <View
        style={[
          styles.bottom,
          {
            paddingLeft: size === 'small' ? 8 : 0,
            paddingRight: size === 'small' ? 8 : 0,
            marginTop: size === 'small' ? 8 : 16,
            marginBottom: size === 'small' ? 8 : 4,
          },
        ]}
      >
        <View style={styles.concertInfoWrapper}>
          <Text
            numberOfLines={size === 'small' ? 2 : 0}
            style={[
              styles.concertTitle,
              {
                fontSize: size === 'small' ? 14 : 20,
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
                  marginTop: size === 'small' ? 4 : 8,
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
    backgroundColor: 'transparent',
    marginBottom: 16,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: colors.oc.cyan[8].value,
  },
  concertThumbnail: {
    width: '100%',
    aspectRatio: 1 / 1,
    backgroundColor: colors.oc.white.value,
    borderRadius: 8,
  },
  concertTitle: { fontWeight: 'bold', color: colors.oc.black.value },
  concertFormattedDate: {
    fontSize: 14,
    color: colors.oc.cyan['9'].value,
  },
  concertVenue: {
    color: colors.oc.gray[7].value,
    fontSize: 14,
  },
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
  },
  subscribeBtnWrapper: { position: 'absolute', right: 12, bottom: 12 },
})
