import { colors } from '@coldsurfers/ocean-road';
import styled from '@emotion/styled';

export const StyledSearchResultWrapper = styled.div`
  box-shadow:
    0 3px 6px rgba(0, 0, 0, 0.16),
    0 3px 6px rgba(0, 0, 0, 0.23);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  background-color: ${colors.oc.white.value};
  padding: 8px;
  margin: 4px;
`;
