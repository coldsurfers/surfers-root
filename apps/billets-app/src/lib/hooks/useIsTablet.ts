import {useMemo} from 'react';
import deviceInfoModule from 'react-native-device-info';

function useIsTablet() {
  return useMemo(() => deviceInfoModule.isTablet(), []);
}

export default useIsTablet;
