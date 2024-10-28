import { PropsWithChildren } from 'react'
import { GestureResponderEvent, Modal as RNModal, StyleSheet, Pressable, TouchableWithoutFeedback } from 'react-native'

interface ModalProps {
  visible?: boolean
  transparent?: boolean
  onPressBackground?: (event: GestureResponderEvent) => void
}

export const Modal = ({
  children,
  visible = false,
  transparent = true,
  onPressBackground,
}: PropsWithChildren<ModalProps>) => (
  <RNModal visible={visible} transparent={transparent} style={styles.modal}>
    <Pressable onPress={onPressBackground} style={styles.background}>
      <TouchableWithoutFeedback>{children}</TouchableWithoutFeedback>
    </Pressable>
  </RNModal>
)

const styles = StyleSheet.create({
  background: {
    position: 'absolute',
    zIndex: 99,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modal: {
    flex: 1,
  },
})
