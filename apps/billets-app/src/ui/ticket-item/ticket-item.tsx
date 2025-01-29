import { components } from '@/types/api'
import { Button, Text, useColorScheme } from '@coldsurfers/ocean-road/native'
import { memo } from 'react'
import { Linking, StyleSheet, View } from 'react-native'

type TicketItemProps = components['schemas']['TicketDTOSchema']

export const TicketItem = memo(({ sellerName, url }: TicketItemProps) => {
  const { semantics } = useColorScheme()
  const onPress = () => {
    Linking.openURL(url)
  }
  return (
    <View style={[styles.ticketWrapper, { backgroundColor: semantics.background[4] }]}>
      <Text weight="bold" style={{ color: semantics.foreground[1] }}>
        {sellerName}
      </Text>
      <Button size="md" onPress={onPress} style={styles.ticketBtn}>
        티켓 찾기
      </Button>
    </View>
  )
})

const styles = StyleSheet.create({
  ticketWrapper: {
    paddingVertical: 12,
    paddingHorizontal: 12,
    marginHorizontal: 12,
    marginTop: 8,
    marginBottom: 8,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  ticketBtn: {
    marginLeft: 'auto',
  },
})
