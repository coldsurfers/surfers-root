import { ConcertVenueMapView } from '@/features/map'
import { openMap } from '@/lib/utils.map'
import { colors } from '@coldsurfers/ocean-road'
import { Button, Text, useColorScheme } from '@coldsurfers/ocean-road/native'
import {
  BottomSheetBackdrop,
  BottomSheetBackgroundProps,
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetView,
} from '@gorhom/bottom-sheet'
import Clipboard from '@react-native-clipboard/clipboard'
import { Copy } from 'lucide-react-native'
import React, { forwardRef, useCallback } from 'react'
import { Platform, StyleSheet, TouchableOpacity, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { ConcertDetailVenueMapBottomSheetProps } from './concert-detail-venue-map-bottom-sheet.types'

export const ConcertDetailVenueMapBottomSheet = forwardRef<BottomSheetModal, ConcertDetailVenueMapBottomSheetProps>(
  ({ address, region, markerCoordinate }, ref) => {
    const { semantics } = useColorScheme()
    const { bottom: bottomInset } = useSafeAreaInsets()
    const renderBackdrop = useCallback((props: BottomSheetBackgroundProps) => {
      return <BottomSheetBackdrop {...props} appearsOnIndex={0} disappearsOnIndex={-1} />
    }, [])
    return (
      <BottomSheetModalProvider>
        <BottomSheetModal
          index={0}
          ref={ref}
          backdropComponent={renderBackdrop}
          containerStyle={{
            flex: 1,
            // backgroundColor: semantics.background[3],
          }}
          handleStyle={{
            backgroundColor: semantics.background[3],
            borderTopLeftRadius: 12,
            borderTopRightRadius: 12,
          }}
          style={{ flex: 1 }}
        >
          <BottomSheetView
            style={{
              paddingBottom: bottomInset ? bottomInset : 12,
              backgroundColor: semantics.background[3],
            }}
          >
            <ConcertVenueMapView region={region} markerCoordinate={markerCoordinate} size="large" />
            <View style={styles.lineView}>
              <View>
                <Text weight="bold" style={{ fontSize: 14 }}>
                  주소
                </Text>
                <Text style={{ fontSize: 14 }}>{address}</Text>
              </View>
              <TouchableOpacity onPress={() => Clipboard.setString(address)} style={{ marginLeft: 'auto' }}>
                <Copy />
              </TouchableOpacity>
            </View>
            <View style={styles.lineView}>
              <Button
                onPress={() => openMap({ lat: region.latitude, lng: region.longitude, label: '공연장소' })}
                style={{ width: '100%' }}
              >
                <Text weight="medium" style={styles.ctaText}>
                  {Platform.select({
                    ios: '애플',
                    android: '구글',
                    default: '구글',
                  })}
                  맵으로 보기
                </Text>
              </Button>
            </View>
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
  ctaText: { fontSize: 14, color: colors.oc.white.value },
})
