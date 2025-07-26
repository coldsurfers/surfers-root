import ReactNativeHapticFeedback, { type HapticFeedbackTypes } from 'react-native-haptic-feedback';

const defaultOptions = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: false,
};

type HapticTypeKey = keyof typeof HapticFeedbackTypes;

/**
 * withHapticPress - 공통 Haptic + onPress 핸들러
 *
 * @param callback 실행할 onPress 콜백 함수
 * @param type Haptic 타입 (기본값: 'impactLight')
 */
export function withHapticPress(
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  callback: (...args: any[]) => void | Promise<void>,
  type: HapticTypeKey = 'impactLight'
) {
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  return (...args: any[]) => {
    ReactNativeHapticFeedback.trigger(type, defaultOptions);
    callback?.(...args);
  };
}
