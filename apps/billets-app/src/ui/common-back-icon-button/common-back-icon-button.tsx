import { IconButton } from '@coldsurfers/ocean-road/native'
import { StyleSheet } from 'react-native'

const BASE_TOP = 40

export const CommonBackIconButton = ({ onPress, top }: { onPress?: () => void; top?: number }) => {
  return (
    <IconButton
      icon="←"
      theme="transparentDarkGray"
      onPress={onPress}
      hitSlop={{
        top: 20,
        left: 20,
        right: 20,
        bottom: 20,
      }}
      style={[
        styles.backButtonPosition,
        {
          top: top ? top : BASE_TOP,
        },
      ]}
    />
  )
}

const styles = StyleSheet.create({
  backButtonPosition: {
    position: 'absolute',
    left: 15,
    zIndex: 99,
  },
})
