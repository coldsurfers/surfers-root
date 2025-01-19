import { Button, Modal, useColorScheme } from '@coldsurfers/ocean-road/native'
import { useCallback } from 'react'
import { StyleSheet, View } from 'react-native'
import { useUserCurrentLocationStore } from '../../features/location/stores'
import commonStyles from '../../lib/common-styles'
import geolocationUtils from '../../lib/geolocationUtils'
import palettes from '../../lib/palettes'
import { useHomeScreenNavigation } from '../../screens/home-screen/home-screen.hooks'

export const LocationSelectorModal = ({
  visible,
  onPressBackground,
}: {
  visible: boolean
  onPressBackground: () => void
}) => {
  const { semantics } = useColorScheme()
  const navigation = useHomeScreenNavigation()
  const setUserCurrentLocation = useUserCurrentLocationStore((state) => state.setUserCurrentLocation)
  const onPressCurrentLocation = useCallback(async () => {
    const data = await geolocationUtils.getCurrentLocation()
    const { latitude, longitude } = data.coords
    setUserCurrentLocation({
      latitude,
      longitude,
      type: 'current-location',
      cityName: null,
    })
    onPressBackground()
  }, [onPressBackground, setUserCurrentLocation])
  const onPressOtherLocations = useCallback(() => {
    navigation.navigate('LocationSelectionScreen', {})
    onPressBackground()
  }, [navigation, onPressBackground])

  return (
    <Modal visible={visible} onPressBackground={onPressBackground}>
      <View
        style={[
          styles.innerView,
          commonStyles.shadowBox,
          {
            backgroundColor: semantics.background[4],
          },
        ]}
      >
        <Button onPress={onPressCurrentLocation}>현재 위치 사용하기</Button>
        <Button onPress={onPressOtherLocations} style={styles.anotherLocBtn}>
          위치 선택하기
        </Button>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  innerView: {
    backgroundColor: palettes.white,
    width: 250,
    height: 'auto',
    minHeight: 200,
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  anotherLocBtn: { marginTop: 12, backgroundColor: palettes.lightblue[500] },
})
