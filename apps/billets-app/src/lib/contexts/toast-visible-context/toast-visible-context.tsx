import { Toast } from '@coldsurfers/ocean-road/native';
import React, {
  createContext,
  type PropsWithChildren,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { KeyboardAvoidingView, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

const AnimatedToastWrapper = Animated.createAnimatedComponent(View);

export const ToastVisibleContext = createContext<{
  toastVisible: boolean;
  message: string;
  show: (
    params: {
      autoHide?: boolean;
      duration?: number;
      message: string;
      type?: 'info' | 'warning' | 'error';
      // biome-ignore lint/suspicious/noConfusingVoidType: <explanation>
    } | void
  ) => void;
  hide: () => void;
}>({
  toastVisible: false,
  message: '',
  show: () => {},
  hide: () => {},
});

const INITIAL_TRANSLATE_Y_VALUE = 150;
const BOUNCED_TRANSLATE_Y_VALUE = -25;

export const ToastVisibleContextProvider = ({ children }: PropsWithChildren) => {
  const timeoutId: { current: ReturnType<typeof setTimeout> | null } = useRef(null);
  const [toastType, setToastType] = useState<'info' | 'warning' | 'error'>('info');
  const [message, setMessage] = useState<string>('');
  const [toastVisible, setToastVisible] = useState<boolean>(false);
  const translateYValue = useSharedValue(INITIAL_TRANSLATE_Y_VALUE);

  const hide = useCallback(() => {
    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
    }
    setToastVisible(false);
  }, []);
  const show = useCallback(
    (
      params: {
        autoHide?: boolean;
        duration?: number;
        message: string;
        type?: 'info' | 'warning' | 'error';
        // biome-ignore lint/suspicious/noConfusingVoidType: <explanation>
      } | void
    ) => {
      if (params) {
        setMessage(params.message);
        if (params.type) {
          setToastType(params.type ?? 'info');
        }
      }
      setToastVisible(true);
      if (params?.autoHide) {
        timeoutId.current = setTimeout(
          () => {
            hide();
          },
          params.duration ? params.duration : 1500
        );
      }
    },
    [hide]
  );

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: translateYValue.value,
        },
      ],
    };
  });

  useEffect(() => {
    translateYValue.value = withTiming(
      toastVisible ? BOUNCED_TRANSLATE_Y_VALUE : INITIAL_TRANSLATE_Y_VALUE,
      {
        duration: 600,
      }
    );
  }, [toastVisible, translateYValue]);

  return (
    <ToastVisibleContext.Provider
      value={{
        toastVisible,
        show,
        hide,
        message,
      }}
    >
      {children}
      <KeyboardAvoidingView behavior="position">
        <AnimatedToastWrapper style={animatedStyles}>
          <Toast type={toastType} message={message} />
        </AnimatedToastWrapper>
      </KeyboardAvoidingView>
    </ToastVisibleContext.Provider>
  );
};
