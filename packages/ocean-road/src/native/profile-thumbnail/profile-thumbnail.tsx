import { useMemo } from 'react'
import { Image, StyleSheet, View } from 'react-native'
import { colors } from '../../tokens'
import { Text } from '../text'

const PROFILE_THUMBNAIL_SIZE = {
  md: {
    width: 62,
    height: 62,
  },
  sm: {
    width: 42,
    height: 42,
  },
  lg: {
    width: 92,
    height: 92,
  },
} as const

type ProfileThumbnailProps = {
  size?: 'md' | 'sm' | 'lg'
  type?: 'square' | 'circle'
  emptyBgText: string
  imageUrl?: string
}

export const ProfileThumbnail = ({ size = 'md', emptyBgText, imageUrl, type = 'square' }: ProfileThumbnailProps) => {
  const sizeStyle = useMemo(() => {
    return PROFILE_THUMBNAIL_SIZE[size]
  }, [size])
  const borderRadiusStyle = useMemo(() => {
    switch (type) {
      case 'circle':
        return {
          borderRadius: sizeStyle.width / 2,
        }
      case 'square':
        return { borderRadius: 4 }
      default:
        return {
          borderRadius: 4,
        }
    }
  }, [sizeStyle.width, type])
  return (
    <View style={[styles.wrapper, sizeStyle, borderRadiusStyle]}>
      {emptyBgText ? (
        <Text weight="bold" style={styles.bgText}>
          {emptyBgText}
        </Text>
      ) : null}
      {imageUrl && <Image source={{ uri: imageUrl }} style={[styles.image, borderRadiusStyle]} />}
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: colors.oc.lime[3].value,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bgText: {
    color: colors.oc.white.value,
    position: 'absolute',
  },
  image: {
    width: '100%',
    height: '100%',
  },
})
