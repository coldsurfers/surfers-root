import color from '@coldsurfers/design-tokens/dist/js/color/variables'
import styled from '@emotion/native'
import { Text } from '../text'

export const StyledIconButtonContainer = styled.TouchableOpacity``

export const StyledIconButtonText = styled(Text)`
  color: ${color.oc.white.value};
  font-size: 20px;
  line-height: 28px;
  font-weight: 700;
  text-align: center;
`
