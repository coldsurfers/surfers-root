import { colors } from '@coldsurfers/ocean-road'
import { Text } from '@coldsurfers/ocean-road/native'
import React, { memo } from 'react'
import { StyleSheet, View } from 'react-native'

interface Props {
  title: string
}

const HeaderItem = ({ title }: Props) => {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.title}>{title}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: colors.oc.white.value,
    paddingHorizontal: 12,
  },
  title: { fontWeight: '700', fontSize: 18 },
})

export default memo(HeaderItem)
