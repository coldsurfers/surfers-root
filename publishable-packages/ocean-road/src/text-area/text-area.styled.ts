import styled from '@emotion/styled';
import { colors, semantics } from '../tokens';

export const StyledTextAreaContainer = styled.textarea<{ $isError: boolean }>`
  padding: 1rem;
  background-color: ${semantics.color.background[2]};
  border: 2px solid ${({ $isError }) => ($isError ? colors.oc.red[7].value : semantics.color.border[2])};
  border-radius: 2rem;
  color: ${semantics.color.foreground[1]};

  &:focus, &:active {
    border: 2px solid ${({ $isError }) => ($isError ? colors.oc.red[7].value : colors.oc.blue[6].value)};
    outline: none;
    box-shadow: none;
  }
`;
