import { colors, semantics } from '@coldsurfers/ocean-road';
import styled from '@emotion/styled';

export const StyledSelect = styled.select`
  appearance: none; /* Remove default styling (useful for custom dropdown) */
  padding: 1rem;
  border: 2px solid ${semantics.color.border[2]};
  border-radius: 2rem;
  color: ${semantics.color.foreground[1]};
  background: ${semantics.color.background[2]}
    url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMCAxMCIgd2lkdGg9IjEwIiBoZWlnaHQ9IjEwIj48cGF0aCBkPSJNMiAyIGwzIDQgMy00eiIgZmlsbD0iIzAwNzBmMyIgLz48L3N2Zz4=')
    no-repeat right 10px center;
  background-size: 12px; /* Adjust arrow size */
  outline: none;

  &:focus {
    border-color: ${colors.oc.indigo[6].value};
    box-shadow: 0 0 5px rgba(0, 112, 243, 0.5);
  }
`;

export const StyledOption = styled.option`
  font-size: 16px;
  color: #333;
`;
