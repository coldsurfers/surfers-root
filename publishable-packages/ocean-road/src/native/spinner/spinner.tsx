import styled from '@emotion/native';
import { LoaderCircle } from 'lucide-react-native';
import { useEffect, useMemo } from 'react';
import { type ColorValue, type StyleProp, StyleSheet, View, type ViewStyle } from 'react-native';
import Reanimated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import { colors } from '../../tokens';

const AnimatedLoaderIcon = Reanimated.createAnimatedComponent(LoaderCircle);

const LoaderIcon = styled(AnimatedLoaderIcon)`
  color: ${colors.oc.cyan[5].value};
`;

interface Props {
  positionCenter?: boolean;
  size?: number | 'small' | 'large' | 'medium';
  color?: ColorValue;
  style?: StyleProp<ViewStyle>;
}

export const Spinner = ({ positionCenter = false, size = 'large', color, style }: Props) => {
  const rotation = useSharedValue(0); // Shared value for rotation

  // Animated style for rotation
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${rotation.value}deg` }],
    };
  });

  const sizeNumber = useMemo(() => {
    switch (size) {
      case 'large':
        return 42;
      case 'small':
        return 20;
      case 'medium':
        return 32;
      default:
        return 42;
    }
  }, [size]);

  useEffect(() => {
    // Start the rotation animation
    rotation.value = withRepeat(
      withTiming(360, { duration: 600 }), // Full rotation in 2000ms
      -1, // Infinite repeat
      false // Reverse the direction after each cycle
    );
  }, [rotation]);

  return (
    <View style={[positionCenter && styles.positionCenter, style]}>
      <View style={styles.animationWrapper}>
        <LoaderIcon size={sizeNumber} color={color} style={animatedStyle} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  positionCenter: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  animationWrapper: { justifyContent: 'center', alignItems: 'center' },
});
