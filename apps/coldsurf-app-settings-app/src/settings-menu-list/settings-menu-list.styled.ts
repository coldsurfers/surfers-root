import { Text } from '@coldsurfers/ocean-road/native';
import styled from '@emotion/native';

export const StyledMenuItem = styled.TouchableOpacity`
  height: 46px;
  flex-direction: row;
  align-items: center;
  border-bottom-width: 1px;
`;

export const StyledText = styled(Text)`
  font-size: 14px;
  margin-left: 20px;
`;

export const StyledVersionText = styled(Text)`
  font-size: 12px;
  margin-left: 46px;
  margin-top: 12px;
`;
