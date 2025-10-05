import { Button, Text, colors, semantics } from '@coldsurfers/ocean-road';
import styled from '@emotion/styled';
import { BellDot as BellDotIcon, MapPinned as MapPinnedIcon } from 'lucide-react';

export const StyledDownloadAppContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 1.25rem;
`;

export const StyledDownloadAppLeft = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export const StyledDownloadAppLogo = styled.div`
  background-image: url('/logo.png');
  background-size: cover;
  background-position: 50%;
  width: 100px;
  height: 100px;
`;

export const StyledAppContentContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`;

export const StyledBellIcon = styled(BellDotIcon)`
  color: ${semantics.color.foreground[4]};
  width: 24px;
  height: 24px;
  margin-right: 12px;
`;

export const StyledMapPinIcon = styled(MapPinnedIcon)`
  color: ${semantics.color.foreground[4]};
  width: 24px;
  height: 24px;
  margin-right: 12px;
`;

export const StyledAppText = styled(Text)`
  font-size: 14px;
  font-weight: 500;
  color: ${semantics.color.foreground[4]};
  margin: unset;
`;

export const AppDownloadButton = styled(Button)`
  margin-top: 1rem;
`;

export const StyledAppDownloadText = styled(Text)`
  font-size: 14px;
  font-weight: 500;
  color: ${colors.oc.white.value};
  margin: unset;
`;
