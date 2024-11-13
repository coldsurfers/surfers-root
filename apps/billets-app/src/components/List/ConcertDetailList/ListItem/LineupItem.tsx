import React, { memo } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { ConcertDetailLineupSectionData } from '../types'

const LineupItem = ({ thumbnailUrl, name }: ConcertDetailLineupSectionData) => {
  return (
    <View style={styles.wrapper}>
      <Image style={styles.image} source={{ uri: thumbnailUrl }} />
      <Text style={styles.name}>{name}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    height: 75 + 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: { width: 75, height: 75, borderRadius: 75 / 2 },
  name: {
    marginLeft: 8,
    marginBottom: 'auto',
    marginTop: 8,
    paddingTop: 8,
    fontWeight: '700',
    fontSize: 18,
  },
})

export default memo(LineupItem)
