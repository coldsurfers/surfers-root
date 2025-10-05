import { Button } from '@coldsurfers/ocean-road';
import styled from '@emotion/styled';

export const StyledAboutContainer = styled.div<{ $isFolded: boolean }>`
  display: flex;
  flex-direction: column;
  gap: unset;
  margin-top: 1rem;
  overflow: hidden;
  max-height: ${(props) => (props.$isFolded ? '500px' : 'unset')};

  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  border-bottom-left-radius: ${(props) => (!props.$isFolded ? '12px' : '0px')};
  border-bottom-right-radius: ${(props) => (!props.$isFolded ? '12px' : '0px')};
  position: relative;
`;

export const StyledAboutShowMoreGradation = styled.div`
  background: linear-gradient(to bottom, transparent, rgba(0, 0, 0, 0.8));
  height: 100px;

  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
`;

export const StyledAboutImage = styled.img`
  width: 100%;

  height: 100%;
  object-fit: cover;
`;

export const StyledAboutButton = styled(Button)`
  margin-top: 1rem;
  width: 100%;
`;
