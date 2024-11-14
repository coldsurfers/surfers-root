import { Text } from '@coldsurfers/ocean-road/native'
import React from 'react'
import { StyleSheet, View } from 'react-native'

interface Props {
  priceInfo: {
    description: string
    price: string
  }
}

const ConcertPriceInfoItem = ({ priceInfo }: Props) => {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.description}>{priceInfo.description}</Text>
      <Text style={styles.price}>{priceInfo.price}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 12,
  },
  description: {},
  price: {},
})

export default ConcertPriceInfoItem
