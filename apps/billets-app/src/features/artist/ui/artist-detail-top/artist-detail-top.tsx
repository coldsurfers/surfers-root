import { useArtistDetailQuery } from '@/lib/react-query'
import { colors } from '@coldsurfers/ocean-road'
import { ProfileThumbnail, Text } from '@coldsurfers/ocean-road/native'
import { useMemo } from 'react'
import { ActivityIndicator, Pressable, StyleSheet, View } from 'react-native'

export const ArtistDetailTop = ({ artistId }: { artistId: string }) => {
  const { data: artistDetail, isLoading: isLoadingArtistDetail } = useArtistDetailQuery({
    id: artistId,
  })
  const artistDetailUIData = useMemo(() => {
    return artistDetail ?? null
  }, [artistDetail])
  return (
    <View>
      <View style={styles.topContainer}>
        {isLoadingArtistDetail ? (
          <ActivityIndicator animating />
        ) : (
          <View style={styles.contentContainer}>
            <Pressable onPress={() => {}}>
              <ProfileThumbnail
                emptyBgText={artistDetailUIData?.name.at(0) ?? ''}
                imageUrl={artistDetailUIData?.artistProfileImage.at(0)?.imageURL}
                size="lg"
                type="circle"
                style={styles.thumbnail}
              />
            </Pressable>
            <Text weight="medium" style={styles.topTitle}>
              {artistDetailUIData?.name ?? ''}
            </Text>
            <Text weight="regular" style={styles.subTitle}>
              아티스트
            </Text>
          </View>
        )}
      </View>
      <Text weight="medium" style={styles.subText}>
        콘서트 리스트
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  topContainer: {
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  topTitle: {
    fontSize: 24,
  },
  subText: {
    marginTop: 20,
    marginBottom: 25,
    fontSize: 20,
  },
  contentContainer: {
    alignItems: 'center',
  },
  thumbnail: {
    marginBottom: 12,
  },
  subTitle: {
    color: colors.oc.gray[8].value,
  },
})
