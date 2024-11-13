import { Text } from 'fstvllife-design-system'
import React from 'react'
import { StyleSheet } from 'react-native'

interface Props {
  location: string
}

const ConcertLocationItem = ({ location }: Props) => {
  return <Text style={styles.text}>{location}</Text>
}

const styles = StyleSheet.create({
  text: {
    backgroundColor: 'white',
    paddingHorizontal: 12,
  },
})

export default ConcertLocationItem
