'use client'

import { Button, Modal } from '@coldsurfers/hotsurf'
import { GestureResponderEvent } from 'react-native'
import styled from 'styled-components'

const ModalInner = styled.div`
  width: 350px;
  display: flex;
  flex-direction: column;

  border: 1px solid #ffffff;
  padding: 12px;
  border-radius: 24px;
  background-color: #18181f;
`

const ModalTitle = styled.h2`
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 1rem;
  font-weight: bold;
  font-size: 18px;
`

interface Props {
  isOpen?: boolean
  onClickGoogleLogin?: () => Promise<void>
  // eslint-disable-next-line no-unused-vars
  onClickBackground?: (event: GestureResponderEvent) => void
}

export function LoginModal({ isOpen = false, onClickGoogleLogin, onClickBackground }: Props) {
  return (
    <Modal visible={isOpen} onPressBackground={onClickBackground}>
      <ModalInner>
        <ModalTitle>ColdSurf Store</ModalTitle>
        <Button text="Google Login" onPress={onClickGoogleLogin} />
      </ModalInner>
    </Modal>
  )
}
