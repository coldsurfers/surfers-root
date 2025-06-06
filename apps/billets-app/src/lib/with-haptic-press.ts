import ReactNativeHapticFeedback, { HapticFeedbackTypes } from 'react-native-haptic-feedback'

const defaultOptions = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: false,
}

/**
 * withHapticPress - 공통 Haptic + onPress 핸들러
 *
 * @param callback 실행할 onPress 콜백 함수
 * @param type Haptic 타입 (기본값: 'impactLight')
 */
export function withHapticPress(
  callback: () => void | Promise<void>,
  type: HapticFeedbackTypes = HapticFeedbackTypes.impactLight,
) {
  return () => {
    ReactNativeHapticFeedback.trigger(type, defaultOptions)
    callback?.()
  }
}
