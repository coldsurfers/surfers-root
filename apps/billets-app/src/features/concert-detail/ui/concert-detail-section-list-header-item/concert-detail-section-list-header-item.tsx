import { colors } from '@coldsurfers/ocean-road'
import { Text, useColorScheme } from '@coldsurfers/ocean-road/native'
import React from 'react'
import { StyleSheet, View } from 'react-native'

interface Props {
  title: string
}

export const ConcertDetailSectionListHeaderItem = ({ title }: Props) => {
  const { semantics } = useColorScheme()
  return (
    <View style={[styles.wrapper, { backgroundColor: semantics.background[3] }]}>
      <Text style={[styles.title, { color: semantics.foreground[1] }]}>{title}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: colors.oc.gray[1].value,
    paddingHorizontal: 12,
  },
  title: { fontWeight: '700', fontSize: 18 },
})
