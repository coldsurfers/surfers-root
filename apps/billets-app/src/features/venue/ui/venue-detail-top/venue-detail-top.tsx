import { useVenueDetailQuery } from '@/lib/react-query'
import { Text } from '@coldsurfers/ocean-road/native'
import { useMemo } from 'react'
import { ActivityIndicator, StyleSheet, View } from 'react-native'

export const VenueDetailTop = ({ venueId }: { venueId: string }) => {
  const { data: venueDetail, isLoading: isLoadingVenueDetail } = useVenueDetailQuery({
    id: venueId,
  })
  const venueDetailUIData = useMemo(() => {
    return venueDetail?.data ?? null
  }, [venueDetail?.data])
  return (
    <View>
      <View style={styles.topContainer}>
        {isLoadingVenueDetail ? (
          <ActivityIndicator animating />
        ) : (
          <Text weight="medium" style={styles.topTitle}>
            {venueDetailUIData?.name}
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
