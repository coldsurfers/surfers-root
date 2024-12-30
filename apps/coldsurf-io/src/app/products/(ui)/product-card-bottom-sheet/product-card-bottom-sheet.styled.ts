import { IconButton, media, semantics } from '@coldsurfers/ocean-road'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { motion } from 'framer-motion'

// Styled container for the bottom sheet
export const SheetContainer = styled(motion.div)`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;

  width: 100%;
  height: 85vh;
  background: white;
  border-radius: 16px 16px 0 0;
  box-shadow: 0 -5px 10px rgba(0, 0, 0, 0.2);
  z-index: 101;
  display: flex;
  flex-direction: column;
  padding: 40px 40px 16px;

  background-color: ${semantics.color.background[4]};

  ${media.medium(css`
    padding: 24px 24px 16px;
  `)}
`

export const SheetInner = styled.div`
  min-width: 0px;
  padding: 24px;
  overflow: hidden auto;
  padding-left: 40px;
  padding-right: 40px;
`

export const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 100;
  backdrop-filter: blur(5px);
`

export const CloseButton = styled(IconButton)`
  padding: 8px;
  position: absolute;
  top: 14px;
  right: 14px;
  color: inherit;
  cursor: pointer;
  border: none;
  z-index: 10000;
  background: ${semantics.color.background[3]};
  border-radius: 100%;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
`
