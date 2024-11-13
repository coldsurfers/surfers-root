import { Text } from 'fstvllife-design-system'
import React, { memo, useCallback } from 'react'
import { Linking, StyleSheet, TouchableOpacity } from 'react-native'
import { ConcertDetailTicketSellerSectionData } from '../types'

const TicketSellerItem = ({ siteUrl, name }: ConcertDetailTicketSellerSectionData) => {
  const onPressTicketSeller = useCallback((url: string) => {
    Linking.canOpenURL(url).then((canOpen) => {
      if (canOpen) {
        Linking.openURL(url)
      }
    })
  }, [])
  return (
    <TouchableOpacity onPress={() => siteUrl && onPressTicketSeller(siteUrl)} style={styles.wrapper}>
      <Text style={styles.name}>{name}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 12,
  },
  name: {
    fontSize: 16,
    textDecorationLine: 'underline',
    color: '#2e94f4',
  },
})

export default memo(TicketSellerItem)
