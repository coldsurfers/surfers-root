import styled from '@emotion/styled'
import { semantics } from '../tokens'

export const StyledTextContainer = styled.span<{ numberOfLines?: number }>`
  color: ${semantics.color.foreground[1]};
  white-space: pre-wrap;
  line-height: 1.25;

  ${({ numberOfLines }) =>
    numberOfLines &&
    `
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: ${numberOfLines};
  -webkit-box-orient: vertical;
  word-break: break-all;
  `}
`
