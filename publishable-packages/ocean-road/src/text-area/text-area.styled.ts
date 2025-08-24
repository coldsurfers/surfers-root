import styled from '@emotion/styled'
import { semantics } from '../tokens'

export const StyledTextAreaContainer = styled.textarea`
  padding: 1rem;
  background-color: ${semantics.color.background[2]};
  border: 2px solid ${semantics.color.border[2]};
  border-radius: 2rem;
  color: ${semantics.color.foreground[1]};
`
