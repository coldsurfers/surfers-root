'use client'

import { Text } from '@coldsurfers/ocean-road'
import { useState } from 'react'
import {
  SharedModalFunctionCheckIcon,
  SharedModalFunctionLinkButton,
  SharedModalFunctionLinkCircle,
  SharedModalFunctionLinkIcon,
} from '../share-modal.styled'

export function CopyLinkButton({ copyUrl }: { copyUrl: string }) {
  const [isEffecting, setIsEffecting] = useState(false)
  const timeoutRef = useState<ReturnType<typeof setTimeout> | null>(null)
  const handleClick = () => {
    if (timeoutRef.current) {
      return
    }
    setIsEffecting(true)
    navigator.clipboard.writeText(copyUrl)
    timeoutRef.current = setTimeout(() => {
      setIsEffecting(false)
    }, 2500)
  }

  return (
    <SharedModalFunctionLinkButton onClick={handleClick}>
      <SharedModalFunctionLinkCircle>
        {isEffecting ? <SharedModalFunctionCheckIcon /> : <SharedModalFunctionLinkIcon />}
      </SharedModalFunctionLinkCircle>
      <Text>{isEffecting ? 'Copied' : 'Copy link'}</Text>
    </SharedModalFunctionLinkButton>
  )
}
