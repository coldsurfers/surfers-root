import { Button, Text, colors } from '@coldsurfers/ocean-road';
import styled from '@emotion/styled';

export const StyledBannerPreviewWrapper = styled.div`
  position: relative;
  width: 430px;
  height: 602px;
  aspect-ratio: 430 / 602;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 24px;
  text-align: center;
  background: #fefefe;
`;

export const StyledBannerForm = styled.form`
  display: flex;
  flex-direction: column;
`;

export const ArtistText = styled(Text)`
  font-size: 72px;
  font-style: italic;
  letter-spacing: 8px;
  text-align: center;
  color: ${colors.oc.black.value};
`;

export const CityText = styled(Text)`
  font-size: 62px;
  font-style: italic;
  letter-spacing: 42px;
  text-align: center;
  color: ${colors.oc.black.value};
`;

export const VenueText = styled(Text)`
  font-size: 32px;
  color: ${colors.oc.black.value};
`;

export const FormattedDateText = styled(Text)`
  font-size: 32px;
  color: ${colors.oc.black.value};
`;

export const TitleText = styled(Text)`
  font-size: 32px;
  font-style: italic;
  letter-spacing: 8px;
  color: ${colors.oc.black.value};
`;

export const StyledGenerateButton = styled(Button)`
  margin-top: 2.5rem;
`;
