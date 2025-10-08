import { Text, semantics } from '@coldsurfers/ocean-road';
import styled from '@emotion/styled';
import { Info } from 'lucide-react';

export const StyledPosterThumbnail = styled.img`
  border-radius: 12px;
  object-fit: contain;
  object-position: 50%;
  width: 100%;
  aspect-ratio: 1 / 1;
  cursor: pointer;
  user-select: none;
  background: ${semantics.color.background[3]};
`;

export const StyledPosterThumbnailEmpty = styled.div`
  border-radius: 12px;
  object-fit: cover;
  object-position: 50%;
  width: 100%;
  aspect-ratio: 1 / 1;

  display: flex;
  align-items: center;
  justify-content: center;

  background-color: ${semantics.color.background[1]};
`;

export const StyledPosterThumbnailEmptyText = styled(Text)`
  text-align: center;
  font-weight: 600;
  font-size: 22px;

  padding-left: 1rem;
  padding-right: 1rem;
`;

export const StyledShareButtonsAccessoryLayout = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;

  gap: 0.5rem;
  margin-top: 0.75rem;
`;

export const StyledContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  position: relative;
`;
