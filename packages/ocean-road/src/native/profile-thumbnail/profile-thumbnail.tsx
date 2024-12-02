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
    width: 30,
    height: 30,
  },
  lg: {
    width: 92,
    height: 92,
  },
} as const

type ProfileThumbnailProps = {
  size?: 'md' | 'sm' | 'lg'
  emptyBgText: string
  imageUrl?: string
}

export const ProfileThumbnail = ({ size = 'md', emptyBgText, imageUrl }: ProfileThumbnailProps) => {
  const sizeStyle = useMemo(() => {
    return PROFILE_THUMBNAIL_SIZE[size]
  }, [size])
  return (
    <View
      style={[
        styles.wrapper,
        sizeStyle,
        {
          borderRadius: sizeStyle.width / 2,
        },
      ]}
    >
      {emptyBgText ? (
        <Text weight="bold" style={styles.bgText}>
          {emptyBgText}
        </Text>
      ) : null}
      {imageUrl && <Image source={{ uri: imageUrl }} style={styles.image} />}
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
  },
  image: {
    width: '100%',
    height: '100%',
  },
})
