import { GlobalLink } from '@/shared/ui';
import { Text, semantics } from '@coldsurfers/ocean-road';
import styled from '@emotion/styled';

export const StyledLineupContainer = styled(GlobalLink)`
  display: flex;

  align-items: center;

  padding-top: 1rem;
  padding-bottom: 1rem;
`;

export const StyledLineupImageWrapper = styled.div`
  border-radius: 50%;
  width: 56px;
  height: 56px;
  background-color: ${semantics.color.background[3]};
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const StyledLineupImageEmptyText = styled(Text)`
  margin: unset;
  font-weight: 600;
`;

export const StyledLineupImage = styled.img`
  border-radius: 50%;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: 50%;
`;

export const StyledLineupNameText = styled(Text)`
  margin: unset;
  margin-left: 1rem;
  font-weight: 600;
  font-size: 18px;
`;
