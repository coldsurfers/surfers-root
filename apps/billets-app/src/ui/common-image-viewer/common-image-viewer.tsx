import React from 'react'
import { Dimensions, StyleSheet } from 'react-native'
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler'
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'

interface ImageViewerProps {
  imageUri: string
  maxZoom?: number // 최대 줌 비율 (기본값 3)
}

export const CommonImageViewer = ({ imageUri, maxZoom = 3 }: ImageViewerProps) => {
  const scale = useSharedValue(1)

  const pinchGesture = Gesture.Pinch()
    .onUpdate((event) => {
      scale.value = Math.min(Math.max(event.scale, 1), maxZoom)
    })
    .onEnd(() => {
      scale.value = withTiming(1, { duration: 300 })
    })

  // 애니메이션 스타일
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }))

  return (
    <GestureHandlerRootView style={styles.container}>
      <GestureDetector gesture={pinchGesture}>
        <Animated.View style={styles.imageContainer}>
          <Animated.Image source={{ uri: imageUri }} style={[styles.image, animatedStyle]} resizeMode="contain" />
        </Animated.View>
      </GestureDetector>
    </GestureHandlerRootView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000', // 배경색 (검정색)
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    flex: 1,
    width: Dimensions.get('screen').width,
    height: 250,
  },
  image: {
    width: '100%',
    height: '100%',
  },
})
