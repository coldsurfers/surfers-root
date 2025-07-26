import FastImage from '@d11/react-native-fast-image';
import styled from '@emotion/native';

export const StyledSubscribeInfoMeContainer = styled.TouchableOpacity`
  flex-direction: column;
  align-items: center;
  margin-right: 8px;
`;

export const StyledSubscribeInfoMeItem = styled.View`
  border-width: 1px;
  width: 92px;
  height: 92px;
  border-radius: 46px;
  align-items: center;
  justify-content: center;
`;

export const StyledSubscribeInfoMeItemImage = styled(FastImage)`
  width: 84px;
  height: 84px;
  border-radius: 42px;
`;
