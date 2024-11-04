import { TouchableWithoutFeedback } from 'react-native'
import { StyledModal, StyledModalBackground } from './modal.styled'
import { ModalProps } from './modal.types'

export const Modal = ({ children, visible = false, transparent = true, onPressBackground }: ModalProps) => (
  <StyledModal visible={visible} transparent={transparent}>
    <StyledModalBackground onPress={onPressBackground}>
      <TouchableWithoutFeedback>{children}</TouchableWithoutFeedback>
    </StyledModalBackground>
  </StyledModal>
)
