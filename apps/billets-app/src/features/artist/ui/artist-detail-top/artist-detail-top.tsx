import { useArtistDetailQuery } from '@/lib/react-query'
import { Text } from '@coldsurfers/ocean-road/native'
import { useMemo } from 'react'
import { ActivityIndicator, StyleSheet, View } from 'react-native'

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
          <Text weight="medium" style={styles.topTitle}>
            {artistDetailUIData?.name ?? ''}
          </Text>
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
})
