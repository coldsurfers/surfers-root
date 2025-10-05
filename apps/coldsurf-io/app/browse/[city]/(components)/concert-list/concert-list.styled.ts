import { Text, media, semantics } from '@coldsurfers/ocean-road';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const StyledListContainer = styled.div``;

export const StyledListHeader = styled.div`
  width: 100%;
`;

export const StyledListHeaderText = styled(Text)``;

export const StyledGridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0px, 1fr));
  gap: 1rem;

  ${media.large(css`
    grid-template-columns: repeat(3, minmax(0px, 1fr));
  `)}
  ${media.medium(css`
    grid-template-columns: repeat(2, minmax(0px, 1fr));
  `)}
  ${media.small(css`
    grid-template-columns: repeat(2, minmax(0px, 1fr));
  `)}
`;

export const StyledGridItem = styled.div`
  display: flex;
  flex-direction: column;
`;

export const StyledGridTop = styled.div`
  position: relative;
`;

export const StyledGridImage = styled.img`
  width: 100%;
  aspect-ratio: 1 / 1;
  object-fit: cover;
  object-position: 50%;
  border-radius: 12px;
  background-color: ${semantics.color.background[3]};
`;

export const StyledGridImageEmptyContainer = styled.div`
  width: 100%;
  aspect-ratio: 1 / 1;
  object-fit: cover;
  object-position: 50%;
  border-radius: 12px;
  background-color: ${semantics.color.background[1]};

  display: flex;

  align-items: center;
  justify-content: center;
`;

export const StyledGridImageEmptyText = styled(Text)`
  text-align: center;
  font-weight: 600;
  font-size: 16px;

  padding-left: 1rem;
  padding-right: 1rem;
`;

export const StyledGridTextContainer = styled.div`
  margin-top: 0.5rem;
`;

export const StyledGridTitle = styled(Text)`
  margin: unset;
  font-size: 16px;
  color: ${semantics.color.foreground[1]};
  font-weight: 600;
`;

export const StyledGridDate = styled(Text)`
  margin: unset;
  margin-top: 0.25rem;
  font-size: 14px;
  color: ${semantics.color.foreground[1]};
`;

export const StyledVenueText = styled(Text)`
  margin: unset;
  margin-top: 0.25rem;
  font-size: 14px;
  color: ${semantics.color.foreground[1]};
`;

export const StyledLoadMoreContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 4rem;
  margin-bottom: 4rem;

  ${media.medium(css`
    margin-top: 2rem;
    margin-bottom: 2rem;
  `)}
`;
