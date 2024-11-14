import { Text } from '@coldsurfers/ocean-road/native'
import React, { memo } from 'react'
import { Pressable, StyleProp, StyleSheet, useWindowDimensions, ViewStyle } from 'react-native'
import FastImage from 'react-native-fast-image'

interface Props {
  onPressItem?: () => void
  containerStyle?: StyleProp<ViewStyle>
  thumbnailUri: string
  title: string
}

const ThumbnailCard = ({ onPressItem, containerStyle, thumbnailUri, title }: Props) => {
  const { width } = useWindowDimensions()
  return (
    <Pressable onPress={onPressItem} style={[styles.wrapper, { width: width / 4 }, containerStyle]}>
      <FastImage source={{ uri: thumbnailUri }} style={styles.thumbnail} />
      <Text numberOfLines={2} style={styles.title}>
        {title}
      </Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  wrapper: { marginLeft: 8 },
  thumbnail: {
    width: '100%',
    height: 140,
    borderRadius: 8,
    marginBottom: 4,
  },
  title: {
    lineHeight: 18,
    color: '#000000',
  },
})

export default memo(ThumbnailCard)
