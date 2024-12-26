import { media, semantics } from '@coldsurfers/ocean-road'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { X as CloseIcon } from 'lucide-react'

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

export const SharedCard = styled.div`
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
`

export const SharedCardThumbnail = styled.div<{ $backgroundImage: string }>`
  background-image: url(${(props) => props.$backgroundImage});
  background-size: cover;
  background-position: center;
  height: 120px;
  aspect-ratio: 1 / 1;
  border-radius: 24px;
  margin-bottom: 1rem;
`
