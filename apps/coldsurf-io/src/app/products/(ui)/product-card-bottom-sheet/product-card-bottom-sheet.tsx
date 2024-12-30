'use client'

import { Text } from '@coldsurfers/ocean-road'
import { AnimatePresence } from 'framer-motion'
import { X as XIcon } from 'lucide-react'
import {
  CloseButton,
  Overlay,
  SheetContainer,
  SheetInner,
  StyledDescription,
  StyledTitle,
} from './product-card-bottom-sheet.styled'
import { ProductCardBottomSheetProps } from './product-card-bottom-sheet.types'

export function ProductCardBottomSheet({ isOpen, onClose, selectedProduct }: ProductCardBottomSheetProps) {
  // Animation variants for the sheet
  const sheetVariants = {
    hidden: { y: '100%', opacity: 0 },
    visible: { y: 0, opacity: 1 },
  }

  return (
    <AnimatePresence>
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
            transition={{ type: 'keyframes', stiffness: 70, damping: 15, duration: 0.25 }}
          >
            <CloseButton onClick={() => onClose()}>
              <XIcon />
            </CloseButton>
            <SheetInner>
              <Text>Products / {selectedProduct.title}</Text>
              <StyledTitle as="h2">{selectedProduct.title}</StyledTitle>
              <StyledDescription as="p">{selectedProduct.longDescription}</StyledDescription>
            </SheetInner>
          </SheetContainer>
        </>
      )}
    </AnimatePresence>
  )
}
