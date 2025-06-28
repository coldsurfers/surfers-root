'use client';

import { Text } from '@coldsurfers/ocean-road';
import { AnimatePresence } from 'framer-motion';
import { X as XIcon } from 'lucide-react';
import {
  CloseButton,
  Overlay,
  SheetContainer,
  SheetInner,
  StyledContentGrid,
  StyledCta,
  StyledCtaButton,
  StyledCtaText,
  StyledDescription,
  StyledProductImage,
  StyledProductImageContainer,
  StyledTitle,
} from './product-card-bottom-sheet.styled';
import type { ProductCardBottomSheetProps } from './product-card-bottom-sheet.types';

export function ProductCardBottomSheet({
  isOpen,
  onClose,
  selectedProduct,
}: ProductCardBottomSheetProps) {
  // Animation variants for the sheet
  const sheetVariants = {
    hidden: { y: '100%', opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <Overlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => onClose()}
          />

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
              <StyledContentGrid>
                <div style={{ gridArea: 'breadcrumbs', verticalAlign: 'baseline' }}>
                  <Text as="p" style={{ margin: 'unset' }}>
                    Products / {selectedProduct.title}
                  </Text>
                </div>
                <div
                  style={{
                    gridArea: 'content',
                    minWidth: 0,
                    marginBottom: 48,
                    marginTop: 13,
                    verticalAlign: 'baseline',
                  }}
                >
                  <StyledTitle as="h2">{selectedProduct.title}</StyledTitle>
                  <StyledDescription as="p">{selectedProduct.longDescription}</StyledDescription>
                </div>
                <div style={{ gridArea: 'ctaButton' }}>
                  {selectedProduct.ctaTitle && (
                    <StyledCta>
                      <StyledCtaButton
                        onClick={() => window.open(selectedProduct.ctaLink, '_blank')}
                      >
                        <StyledCtaText>{selectedProduct.ctaTitle}</StyledCtaText>
                      </StyledCtaButton>
                    </StyledCta>
                  )}
                </div>
                <div style={{ gridArea: 'image' }}>
                  <StyledProductImageContainer>
                    <StyledProductImage src={selectedProduct.productImgSrc} />
                  </StyledProductImageContainer>
                </div>
              </StyledContentGrid>
            </SheetInner>
          </SheetContainer>
        </>
      )}
    </AnimatePresence>
  );
}
