import styled from '@emotion/native'
import { LoaderCircle } from 'lucide-react-native'
import { useEffect, useMemo } from 'react'
import { ColorValue, StyleProp, StyleSheet, View, ViewStyle } from 'react-native'
import Reanimated, { useAnimatedStyle, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated'
import { colors } from '../../tokens'

const AnimatedView = Reanimated.View

const LoaderIcon = styled(LoaderCircle)`
  color: ${colors.oc.cyan[5].value};
`

interface Props {
  positionCenter?: boolean
  size?: number | 'small' | 'large'
  color?: ColorValue
  style?: StyleProp<ViewStyle>
}

export const Spinner = ({ positionCenter = false, size = 'large', color, style }: Props) => {
  const rotation = useSharedValue(0) // Shared value for rotation

  // Animated style for rotation
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${rotation.value}deg` }],
    }
  })

  const sizeNumber = useMemo(() => {
    switch (size) {
      case 'large':
        return 42
      case 'small':
        return 20
      default:
        return 42
    }
  }, [size])

  useEffect(() => {
    // Start the rotation animation
    rotation.value = withRepeat(
      withTiming(360, { duration: 600 }), // Full rotation in 2000ms
      -1, // Infinite repeat
      false, // Reverse the direction after each cycle
    )
  }, [rotation])

  return (
    <View
      style={[
        positionCenter && styles.positionCenter,
        {
          height: sizeNumber,
        },
        style,
      ]}
    >
      <AnimatedView style={animatedStyle}>
        <LoaderIcon size={sizeNumber} color={color} />
      </AnimatedView>
    </View>
  )
}

const styles = StyleSheet.create({
  positionCenter: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flex: 1,
    width: '100%',
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
})
