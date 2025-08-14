import { Text, media, semantics } from '@coldsurfers/ocean-road';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';

export const StyledRecentListTitle = styled(Text)`
  font-weight: bold;
  overflow-wrap: break-word;
  white-space: normal;
  margin-top: 125px;

  display: flex;
  align-items: center;

  ${media.medium(css`
    margin-top: 88px;
    font-size: 24px;
  `)}

  ${media.small(css`
    margin-top: 44px;
    font-size: 20px;
  `)}

  svg {
    display: none;
  }

  &:hover {
    svg {
      display: block;
    }
  }
`;

export const StyledRecentListScrollContainer = styled(motion.div)`
  position: relative;
  display: block;
  white-space: nowrap;
  overflow-x: visible;

  position: relative;

  @media (max-width: 960px) {
    margin-top: 22px;
  }
`;

export const StyledTitle = styled(Text)`
  font-size: 1.25rem;

  font-weight: bold;
  overflow-wrap: break-word;
  white-space: normal;
  margin-top: 1rem;
  margin-bottom: 0;

  ${media['x-large'](css`
    font-size: 1rem;
  `)};

  ${media.medium(css`
    font-size: 0.9rem;
    margin-top: 0.5rem;
  `)};
`;

export const StyledRecentListParagraph = styled(Text)`
  font-size: 1.1rem;
  font-weight: 500;
  overflow-wrap: break-word;
  white-space: normal;
  margin-top: 0;
  margin-bottom: 0;

  ${media['x-large'](css`
    font-size: 0.9rem;
  `)};

  ${media.medium(css`
    font-size: 0.8rem;
  `)};
`;

export const StyledRecentListBilletsConcertCard = styled.div<{ $isLoading: boolean }>`
  position: relative;
  background: ${(props) =>
    props.$isLoading ? 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)' : 'none'};
`;

export const StyledRecentListBilletsConcertCardImageWrapper = styled.div`
  width: 100%;
  height: 100%;
  aspect-ratio: 1 / 1;
  background-color: ${semantics.color.background[1]};
  border-radius: 8px;
  position: relative;
`;

export const StyledRecentListBilletsConcertCardImage = styled.img`
  width: 100%;
  object-fit: cover;
  border-radius: 8px;
  object-position: 50%;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

export const StyledRecentListBilletsConcertCardImageEmpty = styled.div`
  width: 100%;
  object-fit: cover;
  border-radius: 8px;
  object-position: 50%;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2.5rem;
`;

export const StyledRecentListBilletsConcertCardImageEmptyText = styled(Text)`
  text-align: center;
  font-weight: 600;
  font-size: 16px;

  padding-left: 1rem;
  padding-right: 1rem;
`;

export const StyledMotionDiv = styled(motion.div)`
  display: flex;
  flex-direction: row;
  gap: 16px;
`;

export const StyledRecentListScrollContainerArrow = styled.span`
  position: absolute;
  top: 50px;
  right: 0;
  bottom: 20px;
  width: 4%;
  background: rgba(0, 0, 0, 0.5);
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;
`;

export const StyledRecentListScrollContainerItem = styled.div`
  width: 16%;
  aspect-ratio: 1 / 1;
  padding-right: 16px;
  padding-bottom: 88px;

  display: inline-block;

  ${media['x-large'](css`
    width: 24%;
  `)}

  ${media.large(css`
    width: 32%;
    padding-right: 8px;
  `)}
`;
