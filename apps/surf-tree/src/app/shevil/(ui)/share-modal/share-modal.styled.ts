import { media, semantics } from '@coldsurfers/ocean-road'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { motion } from 'framer-motion'
import { Check as CheckIcon, X as CloseIcon, Link2 as LinkIcon } from 'lucide-react'
import Link from 'next/link'

export const ShareModalContent = styled.div`
  background: ${semantics.color.background['3']};
  width: 520px;
  max-width: 520px;
  border-radius: 24px;
  box-shadow:
    0 1px 3px rgba(0, 0, 0, 0.12),
    0 1px 2px rgba(0, 0, 0, 0.24);

  ${media.medium(css`
    width: 100%;
    max-width: 100%;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    border-bottom-left-radius: 0px;
    border-bottom-right-radius: 0px;
  `)}
`

export const ShareModalHeader = styled.div`
  padding-top: 1.5rem;
  padding-right: 0.25rem;
  padding-left: 0.25rem;
  padding-bottom: 0.25rem;

  display: flex;

  align-items: center;
  justify-content: center;
`

export const ShareModalCloseButton = styled.button`
  position: absolute;
  right: 30px;
  background-color: initial;
  border: none;
  cursor: pointer;
`

export const StyledCloseIcon = styled(CloseIcon)`
  color: ${semantics.color.foreground[1]};
`

export const ShareModalBody = styled.div`
  padding-top: 1rem;
  padding-right: 1.25rem;
  padding-left: 1.25rem;
  padding-bottom: 0.25rem;
`

export const SharedCard = styled(motion(Link))`
  border-radius: 24px;
  background-color: ${semantics.color.background[2]};
  padding: 1rem;
  padding-left: 2.5rem;
  padding-right: 2.5rem;
  margin-bottom: 1rem;
  margin-left: 4rem;
  margin-right: 4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  ${media.small(css`
    margin-left: 0rem;
    margin-right: 0rem;
  `)}
`

export const SharedCardThumbnail = styled.div<{ $backgroundImage: string }>`
  background-image: url(${(props) => props.$backgroundImage});
  background-size: cover;
  background-position: center;
  height: 120px;
  min-height: 120px;
  aspect-ratio: 1 / 1;
  border-radius: 24px;
  margin-bottom: 1rem;
`

export const SharedModalFunctionLinks = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 1rem;
  padding-bottom: 2.5rem;
  padding-left: 1.25rem;
  padding-right: 1.25rem;
`

export const SharedModalFunctionLinkButton = styled.button`
  background: initial;
  border: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin-right: 1rem;
  width: 4.5rem;
`

export const SharedModalFunctionLinkCircle = styled.div`
  border-radius: 50%;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${semantics.color.background[2]};
  cursor: pointer;
  margin-bottom: 0.5rem;
`

export const SharedModalFunctionLinkIcon = styled(LinkIcon)`
  color: ${semantics.color.foreground[1]};
`

export const SharedModalFunctionCheckIcon = styled(CheckIcon)`
  color: ${semantics.color.foreground[1]};
`
