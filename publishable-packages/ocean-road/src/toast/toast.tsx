import { motion, usePresence } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { Text } from '../text'
import { semantics } from '../tokens'
import type { ToastProps } from './toast.types'

const AUTO_CLOSE_TIME = 3000

/**
 * 사용시, framer-motion의 AnimatePresence 컴포넌트를 사용해야 합니다.
 */
export const Toast = ({ message, zIndex = 99, onClose }: ToastProps) => {
  const [isPresent, safeToRemove] = usePresence()
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>()
  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    timeoutRef.current = setTimeout(() => {
      onClose()
    }, AUTO_CLOSE_TIME)

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [onClose])

  useEffect(() => {
    if (!isPresent) {
      safeToRemove()
    }
  }, [isPresent, safeToRemove])

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50, transition: { duration: 0.3 } }}
      transition={{ duration: 0.3 }}
      onClick={onClose}
      style={{
        background: semantics.color.background[1],
        padding: '16px 16px',
        margin: '0 16px',
        borderRadius: '8px',
        position: 'fixed',
        bottom: '45px',
        left: 'calc(50% - 192.5px)',
        width: 'calc(385px - 32px - 32px)',
        zIndex,
        boxShadow: `0px 0px 12px 0px ${semantics.color.dimmed[1]}`,
        cursor: 'pointer',
      }}
    >
      <Text as="p">{message}</Text>
    </motion.div>
  )
}
