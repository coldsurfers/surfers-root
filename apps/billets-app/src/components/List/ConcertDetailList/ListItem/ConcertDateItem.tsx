import { Text } from '@coldsurfers/ocean-road/native'
import { format } from 'date-fns'
import React from 'react'
import { StyleSheet } from 'react-native'

interface Props {
  date: string
}

const ConcertDateItem = ({ date }: Props) => {
  return <Text style={styles.text}>{format(new Date(date), 'yyyy-MM-dd')}</Text>
}

const styles = StyleSheet.create({
  text: {
    paddingHorizontal: 12,
  },
})

export default ConcertDateItem
