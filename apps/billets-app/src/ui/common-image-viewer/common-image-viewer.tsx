import { colors } from '@coldsurfers/ocean-road'
import { Text } from '@coldsurfers/ocean-road/native'
import React from 'react'
import { Dimensions, StyleSheet } from 'react-native'
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler'
import Animated, { useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated'

interface ImageViewerProps {
  imageUri: string
  maxZoom?: number // 최대 줌 비율 (기본값 3)
  caption?: string
}

export const CommonImageViewer = ({ imageUri, maxZoom = 3, caption }: ImageViewerProps) => {
  const scale = useSharedValue(1)
  const offsetX = useSharedValue(0) // X축 이동
  const offsetY = useSharedValue(0) // Y축 이동

  const pinchCenterX = useSharedValue(0) // 터치 위치 X
  const pinchCenterY = useSharedValue(0) // 터치 위치 Y

  const pinchGesture = Gesture.Pinch()
    .onStart((event) => {
      // 터치 시작 시, 핀치 위치를 기록
      pinchCenterX.value = event.focalX
      pinchCenterY.value = event.focalY
    })
    .onUpdate((event) => {
      scale.value = Math.min(Math.max(event.scale, 1), maxZoom)

      // 터치 위치 기준으로 이미지 이동
      const deltaX = event.focalX - pinchCenterX.value
      const deltaY = event.focalY - pinchCenterY.value

      offsetX.value = deltaX
      offsetY.value = deltaY
    })
    .onEnd(() => {
      // 줌 후 원래 위치로 돌아오는 애니메이션
      scale.value = withTiming(1, { duration: 300 })
      offsetX.value = withSpring(0)
      offsetY.value = withSpring(0)
    })

  // 애니메이션 스타일
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }, { translateX: offsetX.value }, { translateY: offsetY.value }],
  }))

  return (
    <GestureHandlerRootView style={styles.container}>
      <GestureDetector gesture={pinchGesture}>
        <Animated.View style={styles.imageContainer}>
          <Animated.Image source={{ uri: imageUri }} style={[styles.image, animatedStyle]} resizeMode="contain" />
          {caption ? <Text style={styles.caption}>{caption}</Text> : null}
        </Animated.View>
      </GestureDetector>
    </GestureHandlerRootView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.oc.black.value,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height / 2,
  },
  image: {
    width: '100%',
    height: '100%',
    zIndex: 10,
  },
  caption: {
    color: colors.oc.gray[2].value,
    zIndex: 9,
    fontSize: 12,
    marginHorizontal: 8,
  },
})
