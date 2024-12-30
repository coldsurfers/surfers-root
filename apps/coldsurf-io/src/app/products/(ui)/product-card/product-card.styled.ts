import { semantics } from '@coldsurfers/ocean-road'
import styled from '@emotion/styled'

export const StyledProductCardContainer = styled.div<{ $afterContent: string; $backgroundImgSrc: string }>`
  position: relative;
  aspect-ratio: 1 / 2;
  border-radius: 32px;
  overflow: hidden;
  transform: translateZ(0px);

  background-color: ${semantics.color.background[3]};
  background-image: ${(props) => `url(${props.$backgroundImgSrc})`};
  background-size: cover;
  background-position: 50%;
  background-blend-mode: overlay;

  box-shadow:
    rgba(0, 0, 0, 0.1) 0px 4px 6px -1px,
    rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;

  cursor: pointer;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  gap: 1rem;

  // The hover effect
  &:hover {
    zoom: 1.05;
    transition: all 0.5s ease;
  }

  // Add the ::after pseudo-element
  &::after {
    opacity: 0;
    transition: all 0.5s ease;
    content: '${(props) => props.$afterContent}';
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    display: flex;
    text-align: center;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
    background: ${semantics.color.background[4]};
    color: ${semantics.color.foreground[1]};
    font-weight: bold;
  }

  &:hover::after {
    opacity: 1;
  }
`
