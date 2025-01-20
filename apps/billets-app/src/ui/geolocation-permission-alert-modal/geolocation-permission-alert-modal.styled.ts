import { Button, Modal, Text } from '@coldsurfers/ocean-road/native'
import styled from '@emotion/native'

export const StyledModal = styled(Modal)``

export const StyledModalInner = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 250px;
  min-height: 200px;
  padding: 12px;
  border-radius: 12px;
`

export const StyledText = styled(Text)`
  text-align: center;
`

export const StyledButton = styled(Button)`
  margin-top: 16px;
`
