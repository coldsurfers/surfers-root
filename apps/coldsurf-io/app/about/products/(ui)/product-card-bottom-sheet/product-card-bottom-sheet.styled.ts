import { Button, IconButton, Text, colors, media, semantics } from '@coldsurfers/ocean-road';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';

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
    padding: 0px;
    padding-top: 24px;
  `)}
`;

export const SheetInner = styled.div`
  min-width: 0px;
  padding: 24px;
  overflow: hidden auto;
  padding-left: 40px;
  padding-right: 40px;

  ${media.large(css`
    padding: 24px;
  `)}
`;

export const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 100;
  backdrop-filter: blur(5px);
`;

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
`;

export const StyledTitle = styled(Text)`
  font-size: clamp(28px, 8vmin, 56px);
  font-weight: 820;
  letter-spacing: -0.02em;
  line-height: 1.05;
  text-align: left;
`;

export const StyledDescription = styled(Text)`
  font-weight: 418;
  letter-spacing: 0.01em;
  line-height: 1.5;

  font-size: 16px;
  white-space: pre-wrap;
  ${media.small(css`
    font-size: 14px;
  `)}
`;

export const StyledProductImageContainer = styled.div`
  width: 390px;
  display: flex;
  ${media.large(css`
    margin: 0 auto;
    width: 100%;
  `)}
`;

export const StyledProductImage = styled.img`
  aspect-ratio: 0.5625 / 1;
  width: 100%;
  height: auto;
  border-radius: 20px;
  object-fit: cover;
  object-position: 50%;
`;

export const StyledContentGrid = styled.div`
  display: grid;
  grid-template-areas:
    'breadcrumbs . .'
    'content . image'
    'ctaButton . image'
    'linkApps . image'
    'tags . image';
  grid-template-columns: 3fr 1fr;

  max-width: 1200px;
  margin: 0 auto;

  ${media.large(css`
    grid-template-columns: 1fr;
    grid-template-areas:
      'breadcrumbs'
      'content'
      'image'
      'ctaButton';
  `)}
`;

export const StyledCtaText = styled(Text)`
  font-size: 16px;
  font-weight: 418;
  letter-spacing: 0.01em;
  line-height: 1.5;
  color: ${colors.oc.white.value};
`;

export const StyledCta = styled.div`
  ${media.large(css`
    position: fixed;
    bottom: 36px;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  `)}
`;

export const StyledCtaButton = styled(Button)``;
