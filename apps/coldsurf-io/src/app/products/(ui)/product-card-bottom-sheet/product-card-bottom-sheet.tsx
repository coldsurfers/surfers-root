'use client'

import styled from '@emotion/styled'
import { motion } from 'framer-motion'

// Styled container for the bottom sheet
const SheetContainer = styled(motion.div)`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  max-width: 500px;
  height: 50%;
  background: white;
  border-radius: 16px 16px 0 0;
  box-shadow: 0 -5px 10px rgba(0, 0, 0, 0.2);
  z-index: 10;
  display: flex;
  flex-direction: column;
  padding: 16px;
`

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 5;
`

export function ProductCardBottomSheet({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  // Animation variants for the sheet
  const sheetVariants = {
    hidden: { y: '100%', opacity: 0 },
    visible: { y: 0, opacity: 1 },
  }

  return (
    <div>
      {isOpen && (
        <>
          {/* Overlay */}
          <Overlay initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => onClose()} />

          {/* Bottom Sheet */}
          <SheetContainer
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={sheetVariants}
            transition={{ type: 'spring', stiffness: 50, damping: 15 }}
          >
            <h2>Bottom Sheet</h2>
            <p>Here is some content inside the bottom sheet.</p>
            <button onClick={() => onClose()}>Close</button>
          </SheetContainer>
        </>
      )}
    </div>
  )
}
