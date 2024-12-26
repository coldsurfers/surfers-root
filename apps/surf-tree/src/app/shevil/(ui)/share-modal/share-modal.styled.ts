import { semantics } from '@coldsurfers/ocean-road'
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
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
`

export const ShareModalHeader = styled.div`
  padding-top: 1rem;
  padding-right: 0.25rem;
  padding-left: 0.25rem;
  padding-bottom: 0.25rem;

  display: flex;

  align-items: center;
  justify-content: center;
`

export const ShareModalCloseButton = styled.button`
  position: absolute;
  right: 1rem;
  background-color: initial;
  border: none;
  cursor: pointer;
`

export const StyledCloseIcon = styled(CloseIcon)`
  color: ${semantics.color.foreground[1]};
`
