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
    <View style={styles.topContainer}>
      {isLoadingVenueDetail ? (
        <ActivityIndicator animating />
      ) : (
        <Text weight="medium" style={styles.topTitle}>
          {venueDetailUIData?.name}
        </Text>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  topContainer: {
    height: 250,
    alignItems: 'center',
    justifyContent: 'center',
  },
  topTitle: {
    fontSize: 24,
  },
})
