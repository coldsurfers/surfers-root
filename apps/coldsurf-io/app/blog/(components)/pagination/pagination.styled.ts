import { semantics } from '@coldsurfers/ocean-road'
import styled from '@emotion/styled'
import { MoveLeft, MoveRight } from 'lucide-react'

export const PageMoveButton = styled.button`
  background: initial;
  border: 1px solid ${semantics.color.border[1]};
  border-radius: 8px;
  background-color: ${semantics.color.background[3]};
  cursor: pointer;
  width: 54px;
  height: 54px;
  margin-left: 1rem;
`

export const MoveLeftIcon = styled(MoveLeft)`
  color: ${semantics.color.foreground[1]};
`
export const MoveRightIcon = styled(MoveRight)`
  color: ${semantics.color.foreground[1]};
`

export const StyledPaginationContainer = styled.div`
  display: flex;
  margin-top: 2rem;
  margin-bottom: 5rem;
`
