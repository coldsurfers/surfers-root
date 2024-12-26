'use client'

import { Text } from '@coldsurfers/ocean-road'
import { useCallback, useEffect, useRef, useState } from 'react'
import {
  SharedModalFunctionCheckIcon,
  SharedModalFunctionLinkButton,
  SharedModalFunctionLinkCircle,
  SharedModalFunctionLinkIcon,
} from '../share-modal.styled'

export function CopyLinkButton({ copyUrl }: { copyUrl: string }) {
  const [isEffecting, setIsEffecting] = useState(false)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const handleClick = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    setIsEffecting(true)
    navigator.clipboard.writeText(copyUrl)
    timeoutRef.current = setTimeout(() => {
      setIsEffecting(false)
    }, 2500)
  }, [copyUrl])

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  return (
    <SharedModalFunctionLinkButton onClick={handleClick}>
      <SharedModalFunctionLinkCircle>
        {isEffecting ? <SharedModalFunctionCheckIcon /> : <SharedModalFunctionLinkIcon />}
      </SharedModalFunctionLinkCircle>
      <Text>{isEffecting ? 'Copied' : 'Copy link'}</Text>
    </SharedModalFunctionLinkButton>
  )
}
