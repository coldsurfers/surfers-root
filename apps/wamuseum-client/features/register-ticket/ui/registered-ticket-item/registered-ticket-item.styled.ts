import { Text, semantics } from '@coldsurfers/ocean-road';
import styled from '@emotion/styled';

export const StyledTicketItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${semantics.color.background[2]};
  box-shadow:
    0 1px 3px rgba(0, 0, 0, 0.12),
    0 1px 2px rgba(0, 0, 0, 0.24);
  border-radius: 4px;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  margin: 1.5rem;

  padding: 0.5rem;

  &:hover {
    box-shadow:
      0 14px 28px rgba(0, 0, 0, 0.25),
      0 10px 10px rgba(0, 0, 0, 0.22);
  }
`;

export const StyledTicketItemLabel = styled(Text)`
  margin: 0.5rem 0.5rem 0px 0px;
`;

export const StyledTicketBottomWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 1rem;
`;
