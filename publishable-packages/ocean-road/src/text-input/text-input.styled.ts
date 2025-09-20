import styled from '@emotion/styled';
import { Text } from '../text/text';
import { colors, semantics } from '../tokens';

export const StyledTextInputContainer = styled.input<{ $isError: boolean }>`
  padding: 1rem;
  background-color: ${semantics.color.background[2]};
  border: 2px solid ${({ $isError }) => ($isError ? colors.oc.red[7].value : semantics.color.border[2])};
  border-radius: 2rem;
  color: ${semantics.color.foreground[1]};
  outline: none;

  &:focus, &:active {
    border: 2px solid ${({ $isError }) => ($isError ? colors.oc.red[7].value : colors.oc.blue[6].value)};
    outline: none;
    box-shadow: none;
  }
`;

export const StylesRequiredLabelMark = styled(Text)`
  color: ${colors.oc.red[7].value};
`;
