import { media, semantics, Text } from '@coldsurfers/ocean-road'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { motion } from 'framer-motion'

export const StyledTopTitleText = styled(Text)`
  font-size: 64px;
  font-weight: bold;

  text-align: center;

  ${media.large(css`
    font-size: 56px;
  `)}

  ${media.medium(css`
    font-size: 48px;
  `)}

  ${media.small(css`
    font-size: 40px;
  `)}
`

export const StyledNormalText = styled(Text)`
  font-size: 22px;
  line-height: 1.4;

  display: inline-block;
  text-align: center; /* Centers text within the span */
  width: 100%; /* Set width as needed */

  ${media.large(css`
    font-size: 22px;
  `)}

  ${media.medium(css`
    font-size: 18px;
  `)}

  ${media.small(css`
    font-size: 16px;
  `)}
`

export const SectionDivider = styled.section<{ $topSpace?: boolean }>`
  margin-top: ${(props) => (props.$topSpace ? '12rem' : '4rem')};

  ${(props) =>
    media.large(css`
      margin-top: ${props.$topSpace ? '6rem' : '4rem'};
    `)}

  ${(props) =>
    media.medium(css`
      margin-top: ${props.$topSpace ? '4rem' : '2rem'};
    `)}

  ${(props) =>
    media.small(css`
      margin-top: ${props.$topSpace ? '2rem' : '1rem'};
    `)}

  margin-bottom: 4rem;

  white-space: pre-wrap;

  ${media.large(css`
    margin-left: 1rem;
    margin-right: 1rem;
  `)}
`

export const StyledMotionDiv = styled(motion.div)``

export const StyledFigure = styled.figure`
  margin: unset;
  margin-bottom: 4rem;
`

export const StyledSectionImage = styled.img`
  border-radius: 8px;
  box-shadow:
    0 1px 3px rgba(0, 0, 0, 0.12),
    0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  width: 100%;
  aspect-ratio: 16 / 9;
  object-fit: cover;
  object-position: 50%;
`

export const StyledFigCaption = styled.figcaption`
  color: ${semantics.color.foreground[3]};
  font-size: 12px;
`
