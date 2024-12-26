'use client'

import { Modal, Text } from '@coldsurfers/ocean-road'
import { useLayoutEffect, useState } from 'react'
import { OGInfo, parseOG } from '../../(utils)'
import {
  SharedCard,
  ShareModalBody,
  ShareModalCloseButton,
  ShareModalContent,
  ShareModalHeader,
  StyledCloseIcon,
} from './share-modal.styled'
import { ShareModalProps } from './share-modal.types'

export function ShareModal({ visible, onClose, sharedLink }: ShareModalProps) {
  const [isLoadingParse, setIsLoadingParse] = useState(false)
  const [ogInfo, setOGInfo] = useState<OGInfo | null>(null)

  useLayoutEffect(() => {
    setIsLoadingParse(true)
    async function initOG() {
      const ogInfo = await parseOG(sharedLink?.url || '')
      setOGInfo(ogInfo)
      setIsLoadingParse(false)
    }
    initOG()
  }, [sharedLink?.url])

  console.log(ogInfo)

  return (
    <Modal visible={visible} onClose={onClose}>
      <ShareModalContent>
        <ShareModalHeader>
          <Text as="h4" style={{ margin: 'unset' }}>
            Share link
          </Text>
          <ShareModalCloseButton onClick={onClose}>
            <StyledCloseIcon />
          </ShareModalCloseButton>
        </ShareModalHeader>
        <ShareModalBody>
          <SharedCard>
            <div
              style={{
                backgroundImage: `url(${ogInfo?.image})`,
                backgroundSize: 'cover',
                width: 20,
                height: 20,
              }}
            />
            <Text as="h4" style={{ margin: 'unset' }}>
              {sharedLink?.title}
            </Text>
            <Text as="p" style={{ margin: 'unset' }}>
              {sharedLink?.url}
            </Text>
          </SharedCard>
        </ShareModalBody>
      </ShareModalContent>
    </Modal>
  )
}
