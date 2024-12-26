'use client'

import { Modal, Text } from '@coldsurfers/ocean-road'
import { ShareModalCloseButton, ShareModalContent, ShareModalHeader, StyledCloseIcon } from './share-modal.styled'
import { ShareModalProps } from './share-modal.types'

export function ShareModal({ visible, onClose }: ShareModalProps) {
  return (
    <Modal visible={visible} onClose={onClose}>
      <ShareModalContent>
        <ShareModalHeader>
          <Text as="h3" style={{ margin: 'unset' }}>
            Share link
          </Text>
          <ShareModalCloseButton onClick={onClose}>
            <StyledCloseIcon />
          </ShareModalCloseButton>
        </ShareModalHeader>
      </ShareModalContent>
    </Modal>
  )
}
