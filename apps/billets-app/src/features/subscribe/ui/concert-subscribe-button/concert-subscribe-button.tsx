import { colors } from '@coldsurfers/ocean-road'
import { Text } from '@coldsurfers/ocean-road/native'
import { useMemo } from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'

export const ConcertSubscribeButton = ({
  onPress,
  isSubscribed,
  size = 'md',
}: {
  onPress?: () => void
  isSubscribed: boolean
  size?: 'md' | 'sm'
}) => {
  const sizeStyles = useMemo(() => {
    switch (size) {
      case 'sm':
        return {
          width: 24,
          height: 24,
          borderRadius: 24 / 2,
        }
      case 'md':
      default:
        return {
          width: 36,
          height: 36,
          borderRadius: 36 / 2,
        }
    }
  }, [size])
  const fontSizeStyles = useMemo(() => {
    switch (size) {
      case 'sm':
        return {
          fontSize: 12,
        }
      case 'md':
      default:
        return {
          fontSize: 24,
        }
    }
  }, [size])
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.concertSaveButton,
        {
          backgroundColor: isSubscribed ? colors.oc.black.value : colors.oc.white.value,
        },
        sizeStyles,
      ]}
    >
      <Text style={fontSizeStyles}>❣️</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  concertSaveButton: {
    borderWidth: 1,
    borderColor: colors.oc.gray[3].value,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
