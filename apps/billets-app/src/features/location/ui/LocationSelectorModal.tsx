import {Button, Modal} from '@coldsurfers/hotsurf';
import {StyleSheet, View} from 'react-native';
import palettes from '../../../lib/palettes';
import commonStyles from '../../../lib/common-styles';
import {useCallback} from 'react';
import geolocationUtils from '../../../lib/geolocationUtils';
import {useUserCurrentLocationStore} from '../../../lib/stores/userCurrentLocationStore';
import {useHomeScreenNavigation} from '../../../screens/HomeScreen.hooks';

const LocationSelectorModal = ({
  visible,
  onPressBackground,
}: {
  visible: boolean;
  onPressBackground: () => void;
}) => {
  const navigation = useHomeScreenNavigation();
  const setUserCurrentLocation = useUserCurrentLocationStore(
    state => state.setUserCurrentLocation,
  );
  const onPressCurrentLocation = useCallback(async () => {
    const data = await geolocationUtils.getCurrentLocation();
    const {latitude, longitude} = data.coords;
    setUserCurrentLocation({
      latitude,
      longitude,
    });
    onPressBackground();
  }, [onPressBackground, setUserCurrentLocation]);
  const onPressOtherLocations = useCallback(() => {
    navigation.navigate('LocationSelectionScreen', {});
    onPressBackground();
  }, [navigation, onPressBackground]);

  return (
    <Modal visible={visible} onPressBackground={onPressBackground}>
      <View style={[styles.innerView, commonStyles.shadowBox]}>
        <Button
          text="현재 위치 사용하기"
          onPress={onPressCurrentLocation}
          style={styles.currentLocBtn}
        />
        <Button
          text="위치 선택하기"
          onPress={onPressOtherLocations}
          style={styles.anotherLocBtn}
        />
      </View>
    </Modal>
  );
};

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
  currentLocBtn: {backgroundColor: palettes.black},
  anotherLocBtn: {marginTop: 12, backgroundColor: palettes.lightblue[500]},
});

export default LocationSelectorModal;
