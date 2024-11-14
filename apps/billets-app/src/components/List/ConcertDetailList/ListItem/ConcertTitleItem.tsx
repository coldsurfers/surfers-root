import { colors } from '@coldsurfers/ocean-road'
import { Text } from '@coldsurfers/ocean-road/native'
import React from 'react'
import { StyleSheet } from 'react-native'

interface Props {
  title: string
}

const ConcertTitleItem = ({ title }: Props) => {
  return <Text style={styles.text}>{title}</Text>
}

const styles = StyleSheet.create({
  text: {
    fontWeight: '700',
    fontSize: 22,
    marginTop: 8,
    paddingTop: 12,
    paddingBottom: 12,
    paddingHorizontal: 12,
    backgroundColor: colors.oc.white.value,
  },
})

export default ConcertTitleItem
