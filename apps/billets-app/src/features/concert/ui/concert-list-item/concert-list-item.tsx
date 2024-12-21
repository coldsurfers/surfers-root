import { ConcertSubscribeButton } from '@/features/subscribe'
import { colors } from '@coldsurfers/ocean-road'
import { Text } from '@coldsurfers/ocean-road/native'
import { useCallback } from 'react'
import { Pressable, StyleSheet, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import useSubscribedConcertQuery from '../../../../lib/react-query/queries/useSubscribedConcertQuery'
import {
  getConcertListBottomWrapperDynamicStyles,
  getConcertListItemWrapperDynamicStyles,
  getConcertListThumbnailWrapperDynamicStyles,
} from './concert-list-item.utils'

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
    <Pressable onPress={handlePress} style={[styles.concertListItem, getConcertListItemWrapperDynamicStyles(size)]}>
      <FastImage
        source={{ uri: thumbnailUrl }}
        style={[styles.concertThumbnail, getConcertListThumbnailWrapperDynamicStyles(size)]}
      >
        {onPressSubscribe && (
          <View style={styles.subscribeBtnWrapper}>
            <ConcertSubscribeButton onPress={handlePressSubscribe} isSubscribed={!!subscribedConcertData} />
          </View>
        )}
      </FastImage>
      <View style={[styles.bottom, getConcertListBottomWrapperDynamicStyles(size)]}>
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

ConcertListItem.Skeleton = ({ size = 'large' }: { size?: 'small' | 'large' }) => {
  return (
    <Pressable style={[styles.concertListItem, getConcertListItemWrapperDynamicStyles(size)]}>
      <View
        style={[styles.concertThumbnail, getConcertListThumbnailWrapperDynamicStyles(size), styles.skeletonBackground]}
      />
      <View style={[styles.bottom, getConcertListBottomWrapperDynamicStyles(size)]}>
        <View style={{ width: '100%' }}>
          <View style={styles.skeletonTitle} />
          {size === 'small' && <View style={styles.skeletonTitle} />}
          <View
            style={[
              styles.skeletonSubtitle,
              {
                marginTop: size === 'small' ? 4 : 8,
              },
            ]}
          />
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
  bottom: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  subscribeBtnWrapper: { position: 'absolute', right: 12, bottom: 12 },
  skeletonBackground: {
    backgroundColor: colors.oc.gray[3].value,
  },
  skeletonTitle: {
    width: '80%',
    backgroundColor: colors.oc.gray[3].value,
    height: 24,
    borderRadius: 8,
  },
  skeletonSubtitle: {
    width: '20%',
    backgroundColor: colors.oc.gray[3].value,
    height: 24,
    borderRadius: 8,
  },
})
