import color from '@coldsurfers/design-tokens/dist/js/color/variables'
import styled from '@emotion/native'
import { Platform } from 'react-native'
import { Text } from '../text'

export const StyledIconButtonContainer = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
`

export const StyledIconButtonText = styled(Text)`
  color: ${color.oc.white.value};
  font-size: 18px;
  line-height: ${Platform.select({
    android: '18px',
    ios: undefined,
    default: '18px',
  })};
  font-weight: 700;
`
