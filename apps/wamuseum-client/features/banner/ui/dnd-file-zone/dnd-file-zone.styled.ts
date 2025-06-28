import { Text, semantics } from '@coldsurfers/ocean-road';
import styled from '@emotion/styled';

export const StyledBannerZone = styled.div<{
  $shouldShowBorder?: boolean;
  $isDragging?: boolean;
}>`
  border: ${(props) =>
    props.$shouldShowBorder &&
    `${props.$isDragging ? 2 : 1}px solid ${props.$isDragging ? semantics.color.border[2] : semantics.color.border[1]}`};
`;

export const StyledBannerImg = styled.img`
  width: 100%;
  height: 100%;
  margin-top: -1rem;
`;

export const DropHereText = styled(Text)``;
