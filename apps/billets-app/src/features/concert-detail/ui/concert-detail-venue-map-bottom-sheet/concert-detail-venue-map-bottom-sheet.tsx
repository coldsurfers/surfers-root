import { ConcertVenueMapView } from '@/features/map'
import { openMap } from '@/lib/utils.map'
import { Button, Text } from '@coldsurfers/ocean-road/native'
import { BottomSheetModal, BottomSheetModalProvider, BottomSheetView } from '@gorhom/bottom-sheet'
import Clipboard from '@react-native-clipboard/clipboard'
import React, { forwardRef } from 'react'
import { Platform, StyleSheet, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { ConcertDetailVenueMapBottomSheetProps } from './concert-detail-venue-map-bottom-sheet.types'

export const ConcertDetailVenueMapBottomSheet = forwardRef<BottomSheetModal, ConcertDetailVenueMapBottomSheetProps>(
  ({ address, region, markerCoordinate }, ref) => {
    const { bottom: bottomInset } = useSafeAreaInsets()
    return (
      <BottomSheetModalProvider>
        <BottomSheetModal ref={ref}>
          <BottomSheetView style={{ paddingBottom: bottomInset }}>
            <ConcertVenueMapView region={region} markerCoordinate={markerCoordinate} size="large" />
            <View style={styles.lineView}>
              <View>
                <Text weight="bold">주소</Text>
                <Text>{address}</Text>
              </View>
              <Button theme="transparent" onPress={() => Clipboard.setString(address)} style={{ marginLeft: 'auto' }}>
                복사하기
              </Button>
            </View>
            {Platform.OS === 'ios' && (
              <View style={styles.lineView}>
                <Button
                  onPress={() => openMap({ lat: region.latitude, lng: region.longitude, label: '공연장소' })}
                  style={{ width: '100%' }}
                >
                  애플맵으로 보기
                </Button>
              </View>
            )}
          </BottomSheetView>
        </BottomSheetModal>
      </BottomSheetModalProvider>
    )
  },
)

const styles = StyleSheet.create({
  lineView: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    marginTop: 12,
  },
})
