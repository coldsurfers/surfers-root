import { colors } from '@coldsurfers/ocean-road'
import { Text } from '@coldsurfers/ocean-road/native'
import React, { memo } from 'react'
import { StyleProp, StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native'
import FastImage from 'react-native-fast-image'

interface Props {
  onPress: () => void
  wrapperStyles?: StyleProp<ViewStyle>
  thumbnailURI: string
  titleText: string
  dateText: string
}

const FullGigNewsItem = ({ onPress, wrapperStyles, thumbnailURI, titleText, dateText }: Props) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.wrapper, wrapperStyles]}>
      <FastImage
        source={{
          uri: thumbnailURI,
        }}
        style={styles.thumbnail}
      />
      <View style={styles.rightWrapper}>
        <Text style={styles.title} ellipsizeMode="tail" numberOfLines={1}>
          {titleText}
        </Text>
        <Text style={styles.date}>{dateText}</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: colors.oc.white.value,
    padding: 10,
    borderRadius: 3,
    flexDirection: 'row',
    height: 80,
  },
  thumbnail: {
    width: 60,
    height: '100%',
    borderRadius: 3,
  },
  rightWrapper: { flex: 1 },
  title: { marginLeft: 8, overflow: 'hidden' },
  date: {
    marginLeft: 8,
    fontSize: 12,
    marginTop: 4,
    color: '#a2a2a2',
  },
})

export default memo(FullGigNewsItem)
