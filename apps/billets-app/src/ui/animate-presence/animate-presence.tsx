import { type PropsWithChildren, useEffect } from 'react';
import Reanimated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

export const AnimatePresence = ({ children }: PropsWithChildren) => {
  const opacityValue = useSharedValue(0);

  const opacityStyles = useAnimatedStyle(
    () => ({
      opacity: opacityValue.value,
      ...(opacityValue.value === 0
        ? {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }
        : undefined),
      ...(opacityValue.value === 0 ? { display: 'none' } : { display: 'flex' }),
      backgroundColor: 'rgba(0, 0, 0, 0.2)',
    }),
    [children]
  );

  useEffect(() => {
    opacityValue.value = withTiming(Number(typeof children === 'object'), {
      duration: 250,
    });
  }, [children, opacityValue]);

  return <Reanimated.View style={opacityStyles}>{children}</Reanimated.View>;
};
