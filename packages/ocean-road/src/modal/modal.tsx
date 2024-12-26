import { AnimatePresence, motion } from 'framer-motion'
import { PropsWithChildren } from 'react'
import { semantics } from '../tokens'

export const Modal = ({
  children,
  visible,
  onClose,
}: PropsWithChildren<{
  visible: boolean
  onClose: () => void
}>) => {
  return (
    <AnimatePresence>
      {visible && (
        <>
          <motion.div
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.25 }}
            exit={{ opacity: 0 }}
            style={{
              background: semantics.color.dimmed[1],
              position: 'fixed',
              left: 0,
              right: 0,
              top: 0,
              bottom: 0,
            }}
          />

          <motion.dialog
            open={visible}
            className="modal-content"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            style={{
              background: 'transparent',
              position: 'fixed',
              left: 0,
              right: 0,
              top: 0,
              bottom: 0,
              border: 'none',
            }}
          >
            {children}
          </motion.dialog>
        </>
      )}
    </AnimatePresence>
  )
}
