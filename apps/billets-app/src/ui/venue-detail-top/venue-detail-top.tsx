import { VenueSubscribeButton } from '@/features/subscribe'
import { apiClient } from '@/lib/api/openapi-client'
import { useVenueDetailScreenNavigation } from '@/screens/venue-detail-screen/venue-detail-screen.hooks'
import { colors } from '@coldsurfers/ocean-road'
import { Text, useColorScheme } from '@coldsurfers/ocean-road/native'
import { useSuspenseQuery } from '@tanstack/react-query'
import { ActivityIndicator, StyleSheet, View } from 'react-native'

export const VenueDetailTop = ({ venueId }: { venueId: string }) => {
  const { semantics } = useColorScheme()
  const navigation = useVenueDetailScreenNavigation()
  const { data: venueDetail, isLoading: isLoadingVenueDetail } = useSuspenseQuery({
    queryKey: apiClient.venue.queryKeys.detail(venueId),
    queryFn: () => apiClient.venue.getVenueDetail(venueId),
  })
  return (
    <View>
      <View style={styles.topContainer}>
        {isLoadingVenueDetail ? (
          <ActivityIndicator animating />
        ) : (
          <View style={styles.contentContainer}>
            <Text weight="medium" style={[styles.topTitle, { color: semantics.foreground[1] }]}>
              {venueDetail.name}
            </Text>
            <Text weight="regular" style={[styles.subTitle, { color: semantics.foreground[2] }]}>
              공연장
            </Text>
            <VenueSubscribeButton
              venueId={venueId}
              onShouldLogin={() => {
                navigation.navigate('LoginStackNavigation', {
                  screen: 'LoginSelectionScreen',
                  params: {},
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
  subTitle: {
    color: colors.oc.gray[8].value,
    marginTop: 6,
  },
  subscribeButton: {
    marginTop: 12,
  },
})
