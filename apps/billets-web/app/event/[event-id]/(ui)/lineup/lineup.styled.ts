import { semantics, Text } from '@coldsurfers/ocean-road'
import styled from '@emotion/styled'
import Link from 'next/link'

export const StyledLineupContainer = styled(Link)`
  display: flex;

  align-items: center;

  padding-top: 1rem;
  padding-bottom: 1rem;
`

export const StyledLineupImage = styled.img`
  border-radius: 50%;
  width: 56px;
  height: 56px;
  object-fit: cover;
  object-position: 50%;
  background-color: ${semantics.color.background[3]};
`

export const StyledLineupNameText = styled(Text)`
  margin: unset;
  margin-left: 1rem;
  font-weight: 600;
  font-size: 18px;
`
