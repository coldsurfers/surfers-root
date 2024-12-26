'use client'

import { Modal, Text } from '@coldsurfers/ocean-road'
import { useEffect, useState } from 'react'
import { OGInfo } from '../../(utils)'
import { PoweredBy } from '../powered-by'
import { functionLinks } from './(data)'
import { CopyLinkButton } from './(ui)/copy-link-button'
import {
  SharedCard,
  SharedCardThumbnail,
  SharedModalFunctionLinks,
  ShareModalBody,
  ShareModalCloseButton,
  ShareModalContent,
  ShareModalHeader,
  StyledCloseIcon,
} from './share-modal.styled'
import { fetchOGJsonResponseSchema, ShareModalProps } from './share-modal.types'

export function ShareModal({ visible, onClose, sharedLink }: ShareModalProps) {
  const [isLoadingParse, setIsLoadingParse] = useState(false)
  const [ogInfo, setOGInfo] = useState<OGInfo | null>(null)

  useEffect(() => {
    setIsLoadingParse(true)
    async function fetchOG(url: string) {
      const response = await fetch('/api/og-info?siteUrl=' + url)
      const json = await response.json()
      const validation = fetchOGJsonResponseSchema.safeParse(json)
      if (validation.success) {
        setOGInfo(validation.data)
      } else {
        console.error(validation.error)
      }
      setIsLoadingParse(false)
    }

    if (sharedLink?.url) {
      fetchOG(sharedLink.url)
    }
  }, [sharedLink?.url])

  useEffect(() => {
    if (!visible) {
      setIsLoadingParse(false)
      setOGInfo(null)
    }
  }, [visible])

  console.log(isLoadingParse)

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
          <SharedCard href={sharedLink?.url ?? ''} target="_blank" rel="noopener noreferrer">
            <SharedCardThumbnail $backgroundImage={ogInfo?.image ?? ''} />
            <Text as="h2" style={{ margin: 'unset' }}>
              {ogInfo?.title}
            </Text>
            <Text
              as="p"
              style={{
                margin: 'unset',
                marginTop: '1rem',
                textOverflow: 'ellipsis',
                overflow: 'hidden',
                maxWidth: '100%',
              }}
            >
              {sharedLink?.url}
            </Text>
            <Text
              numberOfLines={3}
              as="p"
              style={{ margin: 'unset', marginTop: '1rem', textOverflow: 'ellipsis', overflow: 'hidden' }}
            >
              {ogInfo?.description}
            </Text>
            {/* </Link> */}
          </SharedCard>
          <SharedModalFunctionLinks>
            {functionLinks.map((item) => {
              if (item.type === 'COPY_LINK') {
                return <CopyLinkButton key={item.type} copyUrl={sharedLink?.url ?? ''} />
              }
              return null
            })}
          </SharedModalFunctionLinks>
          <PoweredBy />
        </ShareModalBody>
      </ShareModalContent>
    </Modal>
  )
}
