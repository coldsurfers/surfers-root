import { IconButton } from '@coldsurfers/ocean-road/native'
import { StyleSheet } from 'react-native'

const BASE_TOP = 40

export const CommonBackIconButton = ({ onPress, top }: { onPress?: () => void; top?: number }) => {
  return (
    <IconButton
      icon="←"
      theme="transparentDarkGray"
      onPress={onPress}
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
  },
})
