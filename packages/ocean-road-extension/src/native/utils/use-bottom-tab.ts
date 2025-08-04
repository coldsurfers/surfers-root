import { Platform } from 'react-native';

export function useBottomTab() {
  const TEMP_BOTTOM_TAB_BAR_HEIGHT = Platform.select({
    ios: 85,
    /**
     * 12 is padding value
     */
    android: 51 + 12,
    default: 51,
  });
  return {
    tabBarHeight: TEMP_BOTTOM_TAB_BAR_HEIGHT,
  };
}
