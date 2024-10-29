import {useCallback, useEffect} from 'react';
import geolocationUtils from '../../../lib/geolocationUtils';
import {useUserCurrentLocationStore} from '../../../lib/stores/userCurrentLocationStore';
import {AppState, Platform} from 'react-native';
import {PERMISSIONS, check, request} from 'react-native-permissions';

const checkPermission = async () => {
  const permission =
    Platform.OS === 'ios'
      ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
      : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;
  const result = await check(permission);
  return result;
};

const requestPermission = async (options?: {iOSAlways: boolean}) => {
  const permission =
    Platform.OS === 'ios'
      ? options?.iOSAlways
        ? PERMISSIONS.IOS.LOCATION_ALWAYS
        : PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
      : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;
  const result = await request(permission);
  return result;
};

const CurrentGeoLocation = () => {
  const setUserCurrentLocation = useUserCurrentLocationStore(
    state => state.setUserCurrentLocation,
  );

  const initializeLocation = useCallback(async () => {
    try {
      const data = await geolocationUtils.getCurrentLocation();
      const {latitude, longitude} = data.coords;
      setUserCurrentLocation({
        latitude,
        longitude,
      });
    } catch (e) {
      console.error('failed to get current location', e);
    }
  }, [setUserCurrentLocation]);

  useEffect(() => {
    checkPermission().then(result => {
      if (result === 'granted') {
        initializeLocation();
      } else {
        requestPermission().then(result => {
          if (result === 'granted') {
            initializeLocation();
          }
        });
      }
    });
  }, [initializeLocation]);

  useEffect(() => {
    const listener = AppState.addEventListener('change', event => {
      if (event === 'active') {
        console.log('foreground');
        initializeLocation();
      }
    });

    return listener.remove;
  }, [initializeLocation]);

  return null;
};

export default CurrentGeoLocation;
