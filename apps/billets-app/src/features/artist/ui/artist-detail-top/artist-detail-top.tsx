import { ArtistSubscribeButton } from '@/features/subscribe'
import { useArtistDetailQuery } from '@/lib/react-query'
import { useArtistDetailScreenNavigation } from '@/screens/artist-detail-screen/artist-detail-screen.hooks'
import { colors } from '@coldsurfers/ocean-road'
import { ProfileThumbnail, Text, useColorScheme } from '@coldsurfers/ocean-road/native'
import { useMemo } from 'react'
import { ActivityIndicator, Pressable, StyleSheet, View } from 'react-native'

export const ArtistDetailTop = ({
  artistId,
  onPressArtistProfile,
}: {
  artistId: string
  onPressArtistProfile?: () => void
}) => {
  const { semantics } = useColorScheme()
  const navigation = useArtistDetailScreenNavigation()
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
            <Pressable onPress={onPressArtistProfile}>
              <ProfileThumbnail
                emptyBgText={artistDetailUIData?.name.at(0) ?? ''}
                imageUrl={artistDetailUIData?.artistProfileImage.at(0)?.imageURL}
                size="lg"
                type="circle"
                style={styles.thumbnail}
              />
            </Pressable>
            <Text weight="medium" style={[styles.topTitle, { color: semantics.foreground[1] }]}>
              {artistDetailUIData?.name ?? ''}
            </Text>
            <Text weight="regular" style={[styles.subTitle, { color: semantics.foreground[2] }]}>
              아티스트
            </Text>
            <ArtistSubscribeButton
              artistId={artistId}
              onShouldLogin={() => {
                navigation.navigate('LoginStackNavigation', {
                  params: {},
                  screen: 'LoginSelectionScreen',
                })
              }}
              style={styles.subscribeButton}
            />
          </View>
        )}
      </View>
      <Text weight="medium" style={[styles.subText, { color: semantics.foreground[1] }]}>
        콘서트 리스트
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  topContainer: {
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
  thumbnail: {},
  subTitle: {
    color: colors.oc.gray[8].value,
    marginTop: 6,
  },
  subscribeButton: {
    marginTop: 12,
  },
})
