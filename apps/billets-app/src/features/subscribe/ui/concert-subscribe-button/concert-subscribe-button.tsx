import { colors } from '@coldsurfers/ocean-road'
import { Text } from '@coldsurfers/ocean-road/native'
import { StyleSheet, TouchableOpacity } from 'react-native'

export const ConcertSubscribeButton = ({ onPress, isSubscribed }: { onPress?: () => void; isSubscribed: boolean }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.concertSaveButton,
        {
          backgroundColor: isSubscribed ? colors.oc.black.value : colors.oc.white.value,
        },
      ]}
    >
      <Text style={styles.concertSaveButtonIcon}>❣️</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  concertSaveButton: {
    borderWidth: 1,
    borderRadius: 18,
    borderColor: colors.oc.gray[3].value,
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  concertSaveButtonIcon: { fontSize: 24 },
})
