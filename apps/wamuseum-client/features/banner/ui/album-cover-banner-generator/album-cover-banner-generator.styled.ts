import { Text, colors } from '@coldsurfers/ocean-road';
import styled from '@emotion/styled';
import { DndFileZone } from '../dnd-file-zone';

export const StyledGeneratorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const StyledDndFileZone = styled(DndFileZone)<{ $bgColor: string }>`
  width: 548px;
  height: 548px;
  background: ${(props) => props.$bgColor};
  aspect-ratio: 1 / 1;
  display: flex;
  flex-direction: column;
  align-items: center;

  box-shadow:
    0 1px 3px rgba(0, 0, 0, 0.12),
    0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);

  &:hover {
    box-shadow:
      0 14px 28px rgba(0, 0, 0, 0.25),
      0 10px 10px rgba(0, 0, 0, 0.22);
  }
`;

export const StyledBannerImg = styled.img`
  width: 25rem;
  height: 25rem;
  aspect-ratio: 1 / 1;
`;

export const StyledArtistText = styled(Text)`
  text-align: center;
  color: ${colors.oc.black.value};
  margin: unset;

  font-size: 38px;
  padding-left: 1rem;
  padding-right: 1rem;
`;

export const StyledLine = styled.div`
  width: 62%;
  height: 2.8px;
  border-radius: 3px;
  background-color: ${colors.oc.black.value};
`;

export const StyledAlbumTitleText = styled(Text)`
  text-align: center;
  color: ${colors.oc.black.value};
  margin: unset;
  font-size: 19px;
`;
